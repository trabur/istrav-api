// libraries
import express from "express"
import "reflect-metadata"
import { createConnection } from "typeorm"

// endpoints
import vehicles from "./vehicles/server"
// import users from "./users/server"

// entities
import Vehicle from './vehicles/Model'
// import UserModel from './users/UserModel'

// init
const app = express()
const config: any = {
  type: "sqljs",
  location: "demo",
  autoSave: true,
  entities: [
    Vehicle,
    // UserModel
  ],
  logging: ['query', 'schema'],
  synchronize: true
}

// create typeorm connection
createConnection(config)
  .then(connection => {
    // repos
    const vehicleRepo = connection.getRepository(Vehicle)
    // const userRepo = connection.getRepository(UserModel)
    
    // decode
    app.use(express.json())

    // listener functions
    vehicles(app, vehicleRepo)
    // users(app, userRepo)
  })
  
export default app
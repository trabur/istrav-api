// libraries
import express from "express"
import "reflect-metadata"
import { createConnection } from "typeorm"

// endpoints
import vehicles from "./vehicles/index"
import users from "./users/index"

// entities
import VehicleModel from './vehicles/VehicleModel'
import UserModel from './users/UserModel'

// init
const app = express()
const config: any = {
  type: "sqljs",
  location: "demo",
  autoSave: true,
  entities: [
    VehicleModel,
    UserModel
  ],
  logging: ['query', 'schema'],
  synchronize: true
}

// create typeorm connection
createConnection(config)
  .then(connection => {
    // repos
    const vehicleRepo = connection.getRepository(VehicleModel)
    const userRepo = connection.getRepository(UserModel)
    
    // decode
    app.use(express.json())

    // listener functions
    vehicles(app, vehicleRepo)
    users(app, userRepo)
  })
  
export default app
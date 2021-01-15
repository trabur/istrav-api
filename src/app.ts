// libraries
import express from "express"
import "reflect-metadata";
import {createConnection} from "typeorm";

// endpoints
import vehicles from "./vehicles/index"

// entities
import VehicleModel from './vehicles/VehicleModel'

// init
const app = express()
const config: any = {
  type: "sqljs",
  location: "demo",
  autoSave: true,
  entities: [
    VehicleModel
  ],
  logging: ['query', 'schema'],
  synchronize: true
}

// create typeorm connection
createConnection(config)
  .then(connection => {
    // repos
    const vehicleRepo = connection.getRepository(VehicleModel);
    
    // decode
    app.use(express.json())

    // listener functions
    vehicles(app, vehicleRepo)
  })
  
export default app
// libraries
import express from "express"
import { createConnection } from "typeorm"

// endpoints
import logging from "./logging/server"
import users from "./users/server"
import vehicles from "./vehicles/server"

// entities
import User from './users/Model'
import Vehicle from './vehicles/Model'

// init
export default function (app) {
  const config: any = {
    type: "sqljs",
    location: "demo",
    autoSave: true,
    entities: [
      Vehicle,
      User
    ],
    logging: ['query', 'schema'],
    synchronize: true
  }
  
  // create typeorm connection
  createConnection(config)
    .then(connection => {
      // repos
      const userRepo = connection.getRepository(User)
      const vehicleRepo = connection.getRepository(Vehicle)
      
      // decode
      app.use(express.json())
  
      // listener functions
      logging(app, userRepo)
      users(app, userRepo)
      vehicles(app, vehicleRepo)
    })
}
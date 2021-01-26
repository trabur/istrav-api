// libraries
import express from "express"
import { createConnection } from "typeorm"

// endpoints
import sources from "./sources/server"
import backup from "./backup/server"
import logging from "./logging/server"
import users from "./users/server"
import vehicles from "./vehicles/server"

// entities
import User from './users/Model'
import Vehicle from './vehicles/Model'

// rabbitmq
var open = require('amqplib').connect('amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef')

// init
export default function (app) {
  const config: any = {
    type: "sqljs",
    location: "demo",
    autoSave: true,
    entities: [
      User,
      Vehicle
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
      open
        .then(function(conn) {
          // amqp
          return conn.createChannel()
        })
        .then(function(channel) {
          sources(app, channel)
        }).catch(console.warn)
      backup(app, userRepo)
      logging(app, userRepo)
      users(app, userRepo)
      vehicles(app, vehicleRepo)
    })
}
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

// Connection URL
const url = 'mongodb+srv://istrav-db-user:vTT8ZKjPJHszMEd7@istrav.gnchl.mongodb.net/istrav?retryWrites=true&w=majority';
// const url = 'mongodb+srv://istrav-db-user:<password>@istrav.gnchl.mongodb.net/<dbname>?retryWrites=true&w=majority';

// mongodb
const MongoClient = require('mongodb').MongoClient(url, { 
  useUnifiedTopology: true
});
const assert = require('assert');
 
// an sql connection
function typeormRepo (app, connection) {
  // create mongodb connection
  MongoClient.connect(function(err, mongodb) {
    assert.equal(null, err);
    console.log("Connected successfully to mongodb");
  
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
        backup(app, channel, mongodb)
      }).catch(console.warn)
    logging(app, userRepo)
    users(app, userRepo)
    vehicles(app, vehicleRepo)

    // mongo connection stays open with express:
    // mongoClient.close()
  })
}

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
  createConnection(config).then((c) => typeormRepo(app, c))
}
// libraries
import express from "express"
import { createConnection } from "typeorm"

// endpoints
import sources from "./sources/server"
import backup from "./backup/server"
import logging from "./logging/server"
import users from "./users/server"
import vehicles from "./vehicles/server"
import apps from "./apps/server"
import members from "./members/server"
import products from "./products/server"
import categories from "./categories/server"
import collections from "./collections/server"

// entities
import User from './users/Model'
import Vehicle from './vehicles/Model'
import App from './apps/Model'
import Member from './members/Model'
import Product from './products/Model'
import Category from './categories/Model'
import Collection from './collections/Model'

// load "process.env" params from a .env file
const dotenv = require('dotenv')
dotenv.config()

// rabbitmq
var open = require('amqplib').connect(process.env.AMQP_URI)

// mongodb
const MongoClient = require('mongodb').MongoClient(process.env.MONGODB_URI, { 
  useUnifiedTopology: true
});
const assert = require('assert');
 
// an sql connection
function typeormRepo (app, connection) {
  // create mongodb connection
  MongoClient.connect(function(err, mongodb) {
    // make sure there is a mongodb client
    assert.equal(null, err);
    console.log("Connected successfully to mongodb");
  
    // repos
    const userRepo = connection.getRepository(User)
    const memberRepo = connection.getRepository(Member)
    const appRepo = connection.getRepository(App)
    const vehicleRepo = connection.getRepository(Vehicle)
    const categoryRepo = connection.getRepository(Category)
    const collectionRepo = connection.getRepository(Collection)
    const productRepo = connection.getRepository(Product)
    
    // decode
    app.use(express.json())

    // listener functions
    open
      .then(function(conn) {
        // amqp
        return conn.createChannel()
      })
      .then(function(amqp) {
        sources(app, amqp)
        backup(app, amqp, mongodb)
      }).catch(console.warn)
    logging(app, userRepo)
    users(app, userRepo)
    vehicles(app, vehicleRepo)
    apps(app, appRepo)
    members(app, memberRepo)
    categories(app, categoryRepo, appRepo)
    collections(app, collectionRepo, appRepo)
    products(app, productRepo, appRepo)

    // mongo connection stays open with express:
    // mongoClient.close()
  })
}

// init
export default function (app) {
  const config: any = {
    type: "postgres",
    url: process.env.POSTGRESQL_URI,
    entities: [
      User,
      Vehicle,
      App,
      Member,
      Product,
      Category,
      Collection
    ],
    logging: ['query', 'schema'],
    synchronize: true
  }

  // create typeorm connection
  createConnection(config).then((c) => typeormRepo(app, c))
}
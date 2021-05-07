// libraries
import express from "express"
import { createConnection } from "typeorm"

// endpoints
// import sources from "./sources/server"
// import backup from "./backup/server"
// import logging from "./logging/server"
import users from "./users/server"
import apps from "./apps/server"
import members from "./members/server"
import products from "./products/server"
import categories from "./categories/server"
import collections from "./collections/server"
import menus from "./menus/server"
import blocks from "./blocks/server"
import pages from "./pages/server"
import faq from "./faq/server"
import carts from "./carts/server"
import orders from "./orders/server"
import licenses from "./licenses/server"
import plans from "./plans/server"
import videos from "./videos/server"
import guides from "./guides/server"
import playlists from "./playlists/server"
import files from "./files/server"

// entities
import User from './users/Model'
import App from './apps/Model'
import Member from './members/Model'
import Product from './products/Model'
import Category from './categories/Model'
import Collection from './collections/Model'
import Menu from './menus/Model'
import Block from './blocks/Model'
import Page from './pages/Model'
import FAQ from './faq/Model'
import Cart from './carts/Model'
import Order from './orders/Model'
import License from './licenses/Model'
import Plan from './plans/Model'
import Video from './videos/Model'
import Guide from './guides/Model'
import Playlist from './playlists/Model'

// load "process.env" params from a .env file
const dotenv = require('dotenv')
dotenv.config()

// rabbitmq
// var open = require('amqplib').connect(process.env.AMQP_URI)

// mongodb
// const MongoClient = require('mongodb').MongoClient(process.env.MONGODB_URI, { 
//   useUnifiedTopology: true
// });
// const assert = require('assert');
 
// an sql connection
function typeormRepo (app, connection) {
  // create mongodb connection
  // MongoClient.connect(function(err, mongodb) {
    // make sure there is a mongodb client
    // assert.equal(null, err);
    // console.log("Connected successfully to mongodb");
  
    // repos
    const userRepo = connection.getRepository(User)
    const memberRepo = connection.getRepository(Member)
    const appRepo = connection.getRepository(App)
    const menuRepo = connection.getRepository(Menu)
    const blockRepo = connection.getRepository(Block)
    const pageRepo = connection.getRepository(Page)
    const faqRepo = connection.getRepository(FAQ)
    const categoryRepo = connection.getRepository(Category)
    const collectionRepo = connection.getRepository(Collection)
    const productRepo = connection.getRepository(Product)
    const cartRepo = connection.getRepository(Cart)
    const orderRepo = connection.getRepository(Order)
    const licenseRepo = connection.getRepository(License)
    const planRepo = connection.getRepository(Plan)
    const videoRepo = connection.getRepository(Video)
    const guideRepo = connection.getRepository(Guide)
    const playlistRepo = connection.getRepository(Playlist)
    
    // decode
    app.use(express.json())

    // listener functions
    // open
    //   .then(function(conn) {
    //     // amqp
    //     return conn.createChannel()
    //   })
    //   .then(function(amqp) {
    //     sources(app, amqp)
    //     backup(app, amqp, mongodb)
    //   }).catch(console.warn)
    // logging(app, userRepo)
    users(app, userRepo, appRepo)
    apps(app, appRepo, categoryRepo, collectionRepo, productRepo, menuRepo, pageRepo, userRepo, orderRepo, licenseRepo, planRepo)
    menus(app, menuRepo, appRepo)
    blocks(app, blockRepo, appRepo)
    pages(app, pageRepo, appRepo)
    faq(app, faqRepo, appRepo)
    members(app, memberRepo)
    categories(app, categoryRepo, appRepo)
    collections(app, collectionRepo, appRepo)
    products(app, productRepo, appRepo)
    carts(app, cartRepo, appRepo)
    orders(app, orderRepo, appRepo)
    licenses(app, licenseRepo, appRepo)
    plans(app, planRepo, appRepo)
    videos(app, videoRepo, appRepo)
    guides(app, guideRepo, appRepo)
    playlists(app, playlistRepo, appRepo)
    files(app, appRepo)

    // mongo connection stays open with express:
    // mongoClient.close()
  // })
}

// init
export default function (app) {
  const config: any = {
    type: "postgres",
    url: process.env.POSTGRESQL_URI,
    entities: [
      User,
      App,
      Menu,
      Block,
      Page,
      FAQ,
      Member,
      Product,
      Category,
      Collection,
      Cart,
      Order,
      License,
      Plan,
      Video,
      Guide,
      Playlist
    ],
    logging: ['query', 'schema'],
    synchronize: true
  }

  // create typeorm connection
  createConnection(config).then((c) => typeormRepo(app, c))
}
import { Request, Response } from "express"
const assert = require('assert')

const insertDocument = async function (db, toCollectionName, event, callback) {
  // Get the documents collection
  const dbCollection = db.collection(toCollectionName)

  let update = await dbCollection.updateOne(
    { id: event.id },       // filter
    { $set: event },        // update
    { upsert: true }        // options
  )

  console.log(`collection: ${toCollectionName} --> id: ${event.id}`)
  callback(update)
}

export default function (amqp, mongodb, config) {
  return async function (req: Request, res: Response) {    
    // params
    let id = req.params.id
    let es = req.body.params // event source

    // arguements
    let from = es.arguements.from  // from: 'my-source',  // rabbitmq queue
    let to = es.arguements.to      // to: 'my-storage',   // mongodb collection

    // mongodb
    const db = mongodb.db('istrav')

    // // data
    // let events = [
    //   {a : 1}, {a : 2}, {a : 3}
    // ]

    // load data from rabbitmq
    es.payload = await amqp.consume(from, function (msg) {
      if (msg !== null) {
        console.log('loaded event from rabbitmq:', msg.content.toString())

        // save data to mongodb
        insertDocument(db, to, msg.content, function (result) {
          // do not close connection in express
          // client.close(); 
          console.log('saved event to mongodb:', result)
          amqp.ack(msg)
        })
      }
    })

    // finish
    res.json(es)
  }
}
import { Request, Response } from "express"
const assert = require('assert')

const insertDocument = async function (db, toCollectionName, event, callback) {
  // Get the documents collection
  const dbCollection = db.collection(toCollectionName)

  let update = await dbCollection.updateOne(
    { id: event.id },       // filter
    { $set: event },        // update todo: save
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
    let options = {
      noAck: es.arguements.noAck || false // false = by default messages are removed from the queue
    }

    // mongodb
    const db = mongodb.db('istrav')

    function insert (msg) {
      // add to event source
      // es.payload.push(JSON.parse(msg.content))

      let event = JSON.parse(msg.content)
      console.log('pulled event from rabbitmq:', msg.content.toString())

      // save data to mongodb
      insertDocument(db, to, event, function (result) {
        // do not close connection in express
        // client.close(); 
        console.log('save event to mongodb:', result)
        amqp.ack(msg)
      })
    }

    function loopPullThenInsert (ok) {
      // run loop for message count total
      for (let i = 0; i < ok.messageCount; i++) {
        // pull rabbitmq message
        amqp
          .get(id, options)
          .then(insert)
      }
    }

    // find number of rabbitmq messages in queue
    amqp
      .assertQueue(id)
      .then(loopPullThenInsert)

    // finish
    res.json(es)
  }
}
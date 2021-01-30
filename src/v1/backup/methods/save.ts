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
      let event = JSON.parse(msg.content)
      console.log('pulled event from rabbitmq:', msg.content.toString())
      
      // add to event source
      es.payload.push({ id: event.id })

      // save data to mongodb
      insertDocument(db, to, event, async function (result) {
        // do not close connection in express
        // client.close(); 
        console.log('saved event to mongodb:', result)
        await amqp.ack(msg)
      })
    }

    async function loopPullThenInsert (ok) {
      console.log('loopPullThenInsert:', ok)
      // run loop for message count total
      for (let i = 0; i < ok.messageCount; i++) {
        // pull rabbitmq message
        await amqp
          .get(from, options)
          .then(insert)
      }
    }

    // find number of rabbitmq messages in queue
    await amqp
      .assertQueue(from)
      .then(loopPullThenInsert)

    // finish
    res.json(es)
  }
}
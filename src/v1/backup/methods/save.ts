import { Request, Response } from "express"
const assert = require('assert')

const insert = async function (db, toCollectionName, event, callback) {
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
    let es = req.body.params // event source

    // arguements
    let from = es.arguements.from  // from: 'my-source',  // rabbitmq queue
    let to = es.arguements.to      // to: 'my-storage',   // mongodb collection
    let options = {
      noAck: es.arguements.noAck || false // false = by default messages are removed from the queue
    }

    // mongodb
    const db = mongodb.db('istrav')

    // keep a record of ids for each saved event
    es.record = []

    function record (msg) {
      // process event source object
      let event = JSON.parse(msg.content)
      console.log('pulled event from rabbitmq:', msg.content.toString())
      
      // add to event source
      es.record.push(event.id)

      // save data to mongodb
      insert(db, to, event, async function (result) {
        console.log('saved event to mongodb:', result.result)
        await amqp.ack(msg)
      })
    }

    async function loopPullThenInsert (ok) {
      console.log('run loop for message count total:', ok)
      for (let i = 0; i < ok.messageCount; i++) {
        // pull rabbitmq message
        await amqp
          .get(from, options)
          .then(record)
      }
    }

    // find number of rabbitmq messages in queue
    await amqp
      .assertQueue(from)
      .then(loopPullThenInsert)

    // note time
    es.serverAt = Date.now()

    // finish
    res.json(es)
  }
}
import { Request, Response } from "express"

// rabbitmq
var open = require('amqplib').connect('amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef');

export default function (channel, config) {
  return async function (req: Request, res: Response) {
    // params
    let id = req.params.id
    let es = req.body.params // event source
    let options = {
      noAck: es.arguements.noAck
    }

    // access queue
    channel
      .assertQueue(id)
      .then(function(ok) {
        
        // pull message
        channel
          .get(id, options)
          .then(function(msg) {
            // add to event source
            es.payload = JSON.parse(msg.content)

            // log event source
            console.log(`API ${es.arguements.url} ::: ${es}`)

            // finish
            res.json(es)
          })

      })
  }
}
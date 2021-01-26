import { Request, Response } from "express"

// rabbitmq
var open = require('amqplib').connect('amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef');

export default function (channel, config) {
  return async function (req: Request, res: Response) {
    console.log(`REST: /${config.version}/${config.endpoint}/consume/:queue`)
    
    // params
    let name = req.params.queue
    let options = JSON.stringify(req.body.params)
    
    // return ok
    let status = null

    // amqp
    let results = channel
      .assertQueue(name)
      .then(function(ok) {
        status = ok
        return channel.consume(name, function(msg) {
          if (msg !== null) {
            return channel.ack(msg, options)
          } else {
            return null
          }
        })
      })

    res.json({
      status,
      results
    })
  }
}
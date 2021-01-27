import { Request, Response } from "express"

// rabbitmq
var open = require('amqplib').connect('amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef');

export default function (channel, config) {
  return async function (req: Request, res: Response) {
    console.log(`REST: /${config.version}/${config.endpoint}/consume/:queue`)
    
    console.log('req.body.params:', req.body.params)

    // params
    let name = req.params.queue
    let options = JSON.stringify(req.body.params)

    // amqp
    channel
      .assertQueue(name)
      .then(function(ok) {
        return channel.get(name, function(msgOrFalse) {
          let msg
          if (msgOrFalse) {
            msg = JSON.parse(msgOrFalse.content.toString())
          } else {
            msg = false
          }

          if (msg && req.body.params.noAck === false) {
            channel.ack(msgOrFalse, options)
          }

          res.json({
            status: ok,
            results: msg
          })
        })
      })
  }
}
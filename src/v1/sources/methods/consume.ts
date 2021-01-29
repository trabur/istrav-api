import { Request, Response } from "express"

export default function (amqp, config) {
  return async function (req: Request, res: Response) {
    // params
    let id = req.params.id
    let es = req.body.params // event source
    let options = {
      noAck: es.arguements.noAck
    }

    // rabbitmq
    amqp
      .assertQueue(id)
      .then(function(ok) {
        
        // pull message
        amqp
          .get(id, options)
          .then(function(msg) {
            // add to event source
            es.payload = JSON.parse(msg.content)
            es.serverAt = Date.now()

            // log event source
            console.log(`API ${es.arguements.url} ::: ${es}`)

            // finish
            res.json(es)
          })

      })
  }
}
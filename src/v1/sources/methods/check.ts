import { Request, Response } from "express"

export default function (amqp, config) {
  return async function (req: Request, res: Response) {
    // params
    let id = req.params.id
    let es = req.body.params // event source

    // rabbitmq
    amqp
      .assertQueue(id)
      .then(function(ok) {
        // add to event source
        es.payload = ok
        es.serverAt = Date.now()

        // log event source
        console.log(`API ${es.arguements.url} ::: ${es}`)

        // finish
        res.json(es)
      })
  }
}
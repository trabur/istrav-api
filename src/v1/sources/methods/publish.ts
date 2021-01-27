import { Request, Response } from "express"

export default function (channel, config) {
  return async function (req: Request, res: Response) {    
    // params
    let id = req.params.id
    let es = req.body.params // event source
    console.log(`req.body ${JSON.stringify(req.body, null, 2)}`)


    // amqp
    channel
      .assertQueue(id)
      .then(function(ok) {
        // add to event source
        es.payload = channel.sendToQueue(id, Buffer.from(es.arguements.body))

        // log event source
        console.log(`API ${es.arguements.url} ::: ${es}`)

        // finish
        res.json(es)
      })
  }
}
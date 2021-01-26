import { Request, Response } from "express"

export default function (channel, config) {
  return async function (req: Request, res: Response) {
    console.log(`REST: /${config.version}/${config.endpoint}/publish/:queue`)
    
    // params
    let name = req.params.queue
    let data = JSON.stringify(req.body.params)

    // amqp
    let results = channel
      .assertQueue(name)
      .then(function(ok) {
        res.json({
          status: ok,
          results: channel.sendToQueue(name, Buffer.from(data))
        })
      })
  }
}
import { Request, Response } from "express"

export default function (channel, config) {
  return async function (req: Request, res: Response) {
    console.log(`REST: /${config.version}/${config.endpoint}/check/:queue`)
    
    // params
    let name = req.params.queue

    // amqp
    let status = channel
      .assertQueue(name)
      .then(function(ok) {
        return ok
      })

    res.json({
      status
    })
  }
}
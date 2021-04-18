import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (orderRep: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded: any = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)

    // perform
    const objects = await orderRep.find({
      where: {
        appId: es.arguements.appId,
        userId: decoded.userId
      }
    })

    // add to event source
    es.payload = {
      success: true,
      data: objects
    }
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}
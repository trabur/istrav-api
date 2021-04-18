import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (orderRep: any, appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded: any = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)
    
    // check if userId from token is the owner to provided order id
    const order = await orderRep.findOne({
      select: ["id"],
      where: {
        id: es.arguements.id,
        appId: es.arguements.appId,
        userId: decoded.userId
      }
    })
    if (!order) {
      // end
      es.payload = {
        success: false,
        reason: 'userId from token is not the owner to provided order id or order does not exist'
      }
      es.serverAt = Date.now()
      console.log(`API ${es.arguements.url} ::: ${es}`)
      res.json(es)
    }
    
    // make sure hackers don't override these values
    es.arguements.change.appId = order.appId
    es.arguements.change.userId = order.userId

    // respond
    let result

    // perform
    const object = await orderRep.findOne({
      where: {
        id: order.id
      }
    })
    orderRep.merge(object, es.arguements.change)
    await orderRep.save(object)
      .then((data: any) => {
        console.log('saved: ', data)
        result = {
          success: true,
          data: data
        }
      })
      .catch((err) => {
        console.log('save err:', err)
        result = {
          success: false,
          reason: err.message
        }
      })

    // add to event source
    es.payload = result
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}
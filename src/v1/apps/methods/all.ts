import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)

    // perform
    const objects = await appRepo.find({
      select: ["id", "domain", "state", "ownerId", "endpoint", "raw", "uploads", "image", "line1", "line2", "buttonName", "buttonUrl", "isStripeTestData", "stripePublishableKeyTest", "stripePublishableKeyLive"],
      where: {
        ownerId: decoded.memberId
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
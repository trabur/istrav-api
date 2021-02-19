import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    let decoded
    if (es.arguements.token) {
      // authentication
      decoded = jwt.verify(es.arguements.token, process.env.SECRET)
      console.log('decoded:', decoded)
    }

    // perform
    const object = await appRepo.findOne({
      select: ["id", "domain", "state", "ownerId", "endpoint", "raw", "uploads", "image", "line1", "line2", "buttonName", "buttonUrl", "isStripeTestData", "stripePublishableKeyTest", "stripeSecretKeyTest", "stripePublishableKeyLive", "stripeSecretKeyLive"],
      // relations: ['owner'],
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state
      }
    })

    // if memberId from token matches ownerId from object then return secret keys
    if (!es.arguements.token || object.ownerId !== decoded.memberId) {
      object.stripeSecretKeyTest = null
      object.stripeSecretKeyLive = null
    }

    let result
    if (object) {
      result = {
        data: object,
        success: true
      }
    } else {
      result = {
        reason: 'app id not found',
        success: false
      }
    }

    // add to event source
    es.payload = result
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}

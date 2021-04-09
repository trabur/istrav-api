import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    let decoded
    if (es.arguements.token !== null) {
      // authentication
      decoded = jwt.verify(es.arguements.token, process.env.SECRET)
      console.log('decoded:', decoded)
    }

    // perform
    const object = await appRepo.findOne({
      select: ["id", "domain", "state", "ownerId", "endpoint", "licenseKey", "raw", "brands", "uploads", "image", "line1", "line2", "buttonName", "buttonUrl", "isStripeTestData", "stripePublishableKeyTest", "stripeSecretKeyTest", "stripePublishableKeyLive", "stripeSecretKeyLive", "tawkToPropertyId", "tawkToChatId", "googleAnalyticsMeasurementId"],
      // relations: ['owner'],
      where: {
        endpoint: es.arguements.endpoint
      }
    })

    
    let result
    if (object) {
      // if memberId from token matches ownerId from object then return secret keys
      if (es.arguements.token === null || object.ownerId !== decoded.memberId) {
        object.stripeSecretKeyTest = null
        object.stripeSecretKeyLive = null
        object.licenseKey = null
      }
      
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

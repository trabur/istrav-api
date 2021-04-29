import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    let decoded: any
    if (es.arguements.token !== null) {
      // authentication
      decoded = jwt.verify(es.arguements.token, process.env.SECRET)
      console.log('decoded:', decoded)
    }

    let theme = [
      "coverBackColor",
      "coverTextColor",
      "primaryBtnBackColor",
      "primaryBtnTextColor",
      "secondaryBtnBackColor",
      "secondaryBtnTextColor"
    ]

    let labels = [
      "labelName",
      "labelShort",
      "labelEmail",
      "labelAbout",
      "labelShipping",
      "labelSloganLine1",
      "labelSloganLine2",
      "labelWelcome",
      "labelLocal",
      "labelTollFree",
      "labelAddressLine1",
      "labelAddressLine2",
      "labelPrimaryOffering"
    ]

    // perform
    const object = await appRepo.findOne({
      relations: ['marketing', 'shop', 'channel'],
      select: ["id", "domain", "state", "ownerId", "endpoint", "marketingId", "shopId", "channelId", "licenseKey", "raw", "brands", "uploads", "logo", ...theme, ...labels, "share", "image", "line1", "line2", "buttonName", "buttonUrl", "mailgunPrivateApiKey", "utterancRepoId", "disqusId", "isStripeTestData", "stripePublishableKeyTest", "stripeSecretKeyTest", "stripePublishableKeyLive", "stripeSecretKeyLive", "tawkToPropertyId", "tawkToChatId", "googleAnalyticsMeasurementId"],
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state
      }
    })
    
    let result
    if (object) {
      // if memberId from token matches ownerId from object then return secret keys
      if (es.arguements.token === null || object.ownerId !== decoded.memberId) {
        object.stripeSecretKeyTest = null
        object.stripeSecretKeyLive = null
        object.licenseKey = null
        object.mailgunPrivateApiKey = null
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

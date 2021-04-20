import { Request, Response } from "express"

export default function (planRep: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const object = await planRep.findOne({
      relations: ['licenses', 'purchase'],
      select: ["id", "name", "slug", "price", "details", "purchaseId", "raw", "grantMarketing", "grantShop", "grantForum", "grantChannel", "grantPromo", "limitOnlineVisitors", "limitFileStorage", "limitEventSources", "limitDatabaseRecords"],
      where: {
        appId: es.arguements.appId,
        slug: es.arguements.slug
      }
    })

    let result
    if (object) {
      result = {
        data: object,
        success: true
      }
    } else {
      result = {
        reason: 'plan id not found',
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

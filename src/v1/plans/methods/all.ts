import { Request, Response } from "express"

export default function (planRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const objects = await planRepo.find({
      relations: ['licenses', 'purchase'],
      select: ["id", "name", "slug", "price", "details", "purchaseId", "raw", "grantMarketing", "grantShop", "grantForum", "grantChannel", "grantPromo", "grantHosting", "grantWhiteLabel"],
      where: {
        appId: es.arguements.appId
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
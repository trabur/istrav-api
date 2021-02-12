import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo: any, categoryRepo: any, collectionRepo: any, productRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)

    // perform
    const app = await appRepo.findOne({
      select: ["id", "domain", "state", "ownerId", "demo"],
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state,
        ownerId: decoded.memberId
      }
    })
    const categoriesCount = await categoryRepo.count({
      where: {
        appId: app.id
      }
    })
    const collectionsCount = await collectionRepo.count({
      where: {
        appId: app.id
      }
    })
    const productsCount = await productRepo.count({
      where: {
        appId: app.id
      }
    })

    // add to event source
    es.payload = {
      success: true,
      data: {
        categoriesCount,
        collectionsCount,
        productsCount
      }
    }
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}

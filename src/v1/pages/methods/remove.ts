import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (pageRepo: any, appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)
    
    // check if memberId from token is the owner to provided appId
    const app = await appRepo.findOne({
      select: ["id"],
      where: {
        id: es.arguements.appId,
        ownerId: decoded.memberId
      }
    })
    if (!app) {
      // end
      es.payload = {
        success: false,
        reason: 'memberId from token is not the owner to provided appId or app does not exist'
      }
      es.serverAt = Date.now()
      console.log(`API ${es.arguements.url} ::: ${es}`)
      res.json(es)
    }

    // perform
    const object = await pageRepo.findOne({
      select: ["id"],
      where: {
        appId: app.id,
        slug: es.arguements.slug
      }
    })
    
    let result
    await pageRepo.delete(object.id)
      .then((data: any) => {
        console.log('deleted: ', data)
        result = {
          success: true,
          data: data
        }
      })
      .catch((err) => {
        console.log('delete err:', err)
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
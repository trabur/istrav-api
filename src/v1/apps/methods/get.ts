import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    // let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    // console.log('decoded:', decoded)

    // perform
    const object = await appRepo.findOne({
      select: ["id", "domain", "state", "ownerId", "endpoint"],
      // relations: ['owner'],
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state,
        // ownerId: decoded.memberId
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

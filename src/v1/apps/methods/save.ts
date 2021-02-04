import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)

    // check for duplicate key
    const dupKey = await appRepo.findOne({
      select: ["id", "domain", "state"],
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state
      }
    })

    // respond
    let result

    // check
    if (dupKey) {
      result = {
        success: false,
        result: 'a member with that domain & state already exists'
      }
    } else {
      // app owner is user id from token
      es.arguements.change.ownerId = decoded.memberId
  
      // perform
      const object = await appRepo.create(es.arguements.change)
      result = {
        success: true,
        result: await appRepo.save(object)
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

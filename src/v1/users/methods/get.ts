import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    let decoded: any
    if (es.arguements.token !== null) {
      // authentication
      decoded = jwt.verify(es.arguements.token, process.env.SECRET)
      console.log('decoded:', decoded)
    }

    // perform
    const object = await userRepo.findOne({
      select: ["id", "email", "username", "firstName", "lastName", "image"],
      where: {
        appId: es.arguements.appId,
        username: es.arguements.username
      }
    })

    let result
    if (object) {
      // if userId from token matches userId from object then return secret values
      if (es.arguements.token === null || object.userId !== decoded.userId) {
        object.email = null
      }

      result = {
        data: object,
        success: true
      }
    } else {
      result = {
        reason: 'user id not found',
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

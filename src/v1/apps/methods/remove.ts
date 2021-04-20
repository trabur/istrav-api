import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded: any = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)

    // perform
    const object = await appRepo.findOne({
      select: ["id"],
      // relations: ['owner'],
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state,
        ownerId: decoded.memberId
      }
    })

    let result
    await appRepo.delete(object.id)
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
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)

    // respond
    let result

    // perform
    const object = await appRepo.findOne({
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state,
        ownerId: decoded.memberId
      }
    })
    appRepo.merge(object, es.arguements.change)
    await appRepo.save(object)
      .then((data) => {
        console.log('saved: ', data)
        result = {
          success: true,
          data: data
        }
      })
      .catch((err) => {
        console.log('save err:', err)
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
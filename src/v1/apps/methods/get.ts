import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)


    // relations: ['model','model.location'],
    // where: {
    //     'model.location': { id: 2},
    // },

    // perform
    const object = await appRepo.findOne({
      select: ["id", "domain", "state"],
      relations: ['owner'],
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state,
        owner: { 
          id: decoded.memberId
        }
      }
    })

    // add to event source
    es.payload = object
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}

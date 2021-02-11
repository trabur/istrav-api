import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authorization: members may only update themselves
    let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)

    // respond
    let result

    // perform
    if (decoded.email === es.arguements.email) {
      const object = await memberRepo.findOne({
        where: {
          email: es.arguements.email
        }
      })
      memberRepo.merge(object, es.arguements.change)
      await memberRepo.save(object)
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
    } else {
      result = {
        success: false,
        reason: 'unauthorized: decoded email from token did not match provided email'
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
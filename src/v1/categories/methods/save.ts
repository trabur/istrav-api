import sha512 from 'crypto-js/sha512'
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (categoryRepo: any, appRepo: any, config: any) {
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
        ownerId: decoded.memberId
      }
    })
    if (app.id !== es.arguements.appId) {
      es.payload = {
        success: false,
        reason: 'memberId from token is not the owner to provided appId'
      }
      es.serverAt = Date.now()
      console.log(`API ${es.arguements.url} ::: ${es}`)
      res.json(es)
    }

    // perform
    let result
    const user = await categoryRepo.create(es.arguements.change)
    await categoryRepo.save(user)
      .then((data: any) => {
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
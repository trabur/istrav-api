import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (cartRepo: any, appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded: any = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)
    
    // check if userId from token is the owner to provided cart id
    const cart = await cartRepo.findOne({
      select: ["id"],
      where: {
        id: es.arguements.id,
        appId: es.arguements.appId,
        userId: decoded.userId
      }
    })
    if (!cart) {
      // end
      es.payload = {
        success: false,
        reason: 'userId from token is not the owner to provided cart id or cart does not exist'
      }
      es.serverAt = Date.now()
      console.log(`API ${es.arguements.url} ::: ${es}`)
      res.json(es)
    }
    
    // perform
    let result
    await cartRepo.delete(cart.id)
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
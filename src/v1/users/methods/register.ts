import sha512 from 'crypto-js/sha512'
import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // convert password to hash
    es.arguements.password = sha512(es.arguements.password).toString()

    // perform
    const existingUser = await memberRepo.findOne({
      select: ["email"],
      where: {
        appId: es.arguements.appId,
        email: es.arguements.email
      }
    })

    let result
    if (!existingUser) {
      const user = await memberRepo.create(es.arguements)
      result = {
        success: true,
        data: await memberRepo.save(user)
      }
    } else {
      result = {
        success: false,
        reason: 'an account with that email already exists'
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
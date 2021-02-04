import sha512 from 'crypto-js/sha512'
import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let id = req.params.id
    let es = req.body.params // event source

    // convert password to hash
    es.arguements.password = sha512(es.arguements.password).toString()

    // perform
    const user = await memberRepo.create(es.arguements)
    const result = await memberRepo.save(user)
    
    // add to event source
    es.payload = result
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)

  }
}
import sha512 from 'crypto-js/sha512'
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express"

import configuration from "../../../config/config";

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const results = await memberRepo.findOne({
      select: ["email", "password"],
      where: {
        email: es.arguements.email
      }
    })
    
    let result
    let check = sha512(es.arguements.password).toString()
    if (results.password === check) {
      const newToken = jwt.sign({ 
        memberId: results.id,
        email: results.email,
      }, process.env.SECRET)
      result = {
        token: newToken,
        success: true // user is auth
      }
    } else {
      result = {
        reason: 'invalid password',
        success: false // user is not auth
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

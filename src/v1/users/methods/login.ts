import sha512 from 'crypto-js/sha512'
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express"

import configuration from "../../../config/config";

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to save a user
    console.log(`LOGIN: /${config.version}/${config.endpoint}/login`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)

    const results = await userRepo.findOne({
      select: ["email", "password", "role"],
      where: {
        email: req.body.params.email
      }
    })
    console.log('validate against this password:', results)
    
    let message
    let check = sha512(req.body.params.password).toString()
    if (results.password === check) {
      const newToken = jwt.sign({ 
        email: results.email,
        role: results.role
      }, configuration.jwtSecret)
      message = {
        token: newToken,
        success: true // user is auth
      }
    } else {
      message = {
        reason: 'invalid password',
        success: false // user is not auth
      }
    }

    console.log('check', message)
    res.json(message)
  }
}

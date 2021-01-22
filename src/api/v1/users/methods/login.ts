import sha512 from 'crypto-js/sha512'
import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to save a user
    console.log(`LOGIN: /api/${config.version}/${config.endpoint}/login`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)

    const results = await userRepo.findOne({
      select: ["email", "password", "role"],
      where: {
        email: req.body.params.email
      }
    })
    console.log('check password against this:', results)
    
    let response
    let up = sha512(req.body.params.password).toString()
    if (up === results.password) {
      response = true // user is auth
    } else {
      response = false // user is not auth
    }

    res.json(response)
  }
}

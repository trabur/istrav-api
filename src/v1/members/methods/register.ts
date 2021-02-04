import sha512 from 'crypto-js/sha512'
import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to save a user
    console.log(`REGISTER: /${config.version}/${config.endpoint}`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)

    // convert password to hash
    req.body.params.password = sha512(req.body.params.password).toString()

    const user = await memberRepo.create(req.body.params)
    const results = await memberRepo.save(user)
    res.json(results)
  }
}
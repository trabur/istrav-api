import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
    console.log(`UPDATE: /${config.version}/${config.endpoint}/${req.params.email}`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)
    const user = await userRepo.findOne(req.params.email)
    userRepo.merge(user, req.body.params)
    const results = await userRepo.save(user)
    res.json(results)
  }
}
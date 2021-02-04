import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
    console.log(`UPDATE: /${config.version}/${config.endpoint}/${req.params.id}`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)
    const user = await memberRepo.findOne(req.params.id)
    memberRepo.merge(user, req.body.params)
    const results = await memberRepo.save(user)
    res.json(results)
  }
}
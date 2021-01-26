import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
    console.log(`REMOVE: /${config.version}/${config.endpoint}/${req.params.email}`)
    console.log("--------------------------")
    const results = await userRepo.delete(req.params.email)
    res.json(results)
  }
}
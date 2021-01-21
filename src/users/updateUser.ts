import { Request, Response } from "express"

export default function (userRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
    console.log("Update user")
    console.log("--------------------------")
    const user = await userRepo.findOne(req.params.id)
    userRepo.merge(user, req.body)
    const results = await userRepo.save(user)
    res.json(results)
  }
}
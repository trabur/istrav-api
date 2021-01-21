import { Request, Response } from "express"

export default function (userRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to save a user
    console.log("Save user")
    console.log("--------------------------")
    const user = await userRepo.create(req.body)
    const results = await userRepo.save(user)
    res.json(results)
  }
}

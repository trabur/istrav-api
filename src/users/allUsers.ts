import { Request, Response } from "express"

export default function (userRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return all users
    console.log("All users")
    console.log("--------------------------")
    const users = await userRepo.find()
    res.json(users)
  }
}
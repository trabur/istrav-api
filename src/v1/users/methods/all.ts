import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return all users
    console.log(`ALL: /${config.version}/${config.endpoint}`)
    console.log("--------------------------")
    const users = await userRepo.find({
      select: ["email", "username", "firstName", "lastName", "role", "createdAt"]
    })
    res.json(users)
  }
}
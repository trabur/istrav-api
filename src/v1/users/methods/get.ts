import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return user by id
    console.log(`GET: /${config.version}/${config.endpoint}/${req.params.email}`)
    console.log("--------------------------")
    const results = await userRepo.findOne({
      select: ["email", "username", "firstName", "lastName", "role", "createdAt"],
      where: {
        email: req.params.email
      }
    })
    res.json(results)
  }
}

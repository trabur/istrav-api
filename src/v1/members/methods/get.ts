import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return user by id
    console.log(`GET: /${config.version}/${config.endpoint}/${req.params.id}`)
    console.log("--------------------------")
    const results = await userRepo.findOne({
      select: ["email", "username", "firstName", "lastName", "createdAt"],
      where: {
        email: req.params.id
      }
    })
    res.json(results)
  }
}

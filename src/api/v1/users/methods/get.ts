import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return vehicle by id
    console.log(`GET: /api/${config.version}/${config.endpoint}/${req.params.id}`)
    console.log("--------------------------")
    const results = await userRepo.findOne({
      select: ["id", "username", "firstName", "lastName", "role", "createdAt"],
      where: {
        id: req.params.id
      }
    })
    res.json(results)
  }
}

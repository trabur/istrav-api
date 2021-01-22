import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return all vehicles
    console.log(`ALL: /api/${config.version}/${config.endpoint}`)
    console.log("--------------------------")
    const vehicles = await userRepo.find({
      select: ["id", "username", "firstName", "lastName", "role", "createdAt"]
    })
    res.json(vehicles)
  }
}
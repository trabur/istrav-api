import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to delete a vehicle by a given vehicle id
    console.log(`REMOVE: /api/${config.version}/${config.endpoint}/${req.params.id}`)
    console.log("--------------------------")
    const results = await userRepo.delete(req.params.id)
    res.json(results)
  }
}
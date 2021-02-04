import { Request, Response } from "express"

export default function (appRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return all vehicles
    console.log(`ALL: /api/${config.version}/${config.endpoint}`)
    console.log("--------------------------")
    const vehicles = await appRepo.find()
    res.json(vehicles)
  }
}
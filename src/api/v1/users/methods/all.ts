import { Request, Response } from "express"

export default function (vehicleRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return all vehicles
    console.log(`ALL: /api/${config.version}/${config.endpoint}`)
    console.log("--------------------------")
    const vehicles = await vehicleRepo.find()
    res.json(vehicles)
  }
}
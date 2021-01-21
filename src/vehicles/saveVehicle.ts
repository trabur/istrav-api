import { Request, Response } from "express"

export default function (vehicleRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to save a vehicle
    console.log("Save vehicle")
    console.log("--------------------------")
    const vehicle = await vehicleRepo.create(req.body)
    const results = await vehicleRepo.save(vehicle)
    res.json(results)
  }
}

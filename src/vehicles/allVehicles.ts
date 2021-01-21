import { Request, Response } from "express"

export default function (vehicleRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return all vehicles
    console.log("All vehicles")
    console.log("--------------------------")
    const vehicles = await vehicleRepo.find()
    res.json(vehicles)
  }
}
import { Request, Response } from "express"

export default function (vehicleRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to delete a vehicle by a given vehicle id
    console.log("Delete vehicle")
    console.log("--------------------------")
    const results = await vehicleRepo.delete(req.params.id)
    res.json(results)
  }
}
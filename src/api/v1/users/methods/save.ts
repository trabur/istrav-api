import { Request, Response } from "express"

export default function (vehicleRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to save a vehicle
    console.log(`SAVE: /api/${config.version}/${config.endpoint}`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)
    const vehicle = await vehicleRepo.create(req.body.params)
    const results = await vehicleRepo.save(vehicle)
    res.json(results)
  }
}

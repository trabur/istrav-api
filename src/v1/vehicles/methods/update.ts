import { Request, Response } from "express"

export default function (vehicleRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to update a vehicle by a given vehicle id
    console.log(`UPDATE: /api/${config.version}/${config.endpoint}`, req.params.id)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)
    const vehicle = await vehicleRepo.findOne(req.params.id)
    vehicleRepo.merge(vehicle, req.body.params)
    const results = await vehicleRepo.save(vehicle)
    res.json(results)
  }
}
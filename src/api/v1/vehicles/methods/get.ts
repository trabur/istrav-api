import { Request, Response } from "express"

export default function (vehicleRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return vehicle by id
    console.log(`GET: /api/${config.version}/${config.endpoint}`, req.params.id)
    console.log("--------------------------")
    const results = await vehicleRepo.findOne(req.params.id)
    res.json(results)
  }
}

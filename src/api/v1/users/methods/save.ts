import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to save a vehicle
    console.log(`SAVE: /api/${config.version}/${config.endpoint}`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)
    const vehicle = await userRepo.create(req.body.params)
    const results = await userRepo.save(vehicle)
    res.json(results)
  }
}

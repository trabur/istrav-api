import request from 'request'

import { Request, Response } from "express"

export default function (vehicleRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return vehicle by id
    console.log("Vehicle by id")
    console.log("--------------------------")
    const results = await vehicleRepo.findOne(req.params.id)
    res.json(results)
  }
}

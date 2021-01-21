import request from 'request'

import { Request, Response } from "express"

export default function (userRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return user by id
    console.log("User by id")
    console.log("--------------------------")
    const results = await userRepo.findOne(req.params.id)
    res.json(results)
  }
}

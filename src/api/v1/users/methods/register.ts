import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to save a user
    console.log(`REGISTER: /api/${config.version}/${config.endpoint}`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)
    const user = await userRepo.create(req.body.params)
    const results = await userRepo.save(user)
    res.json(results)
  }
}

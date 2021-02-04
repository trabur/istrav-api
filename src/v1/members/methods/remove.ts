import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
    console.log(`REMOVE: /${config.version}/${config.endpoint}/${req.params.id}`)
    console.log("--------------------------")
    const results = await memberRepo.delete(req.params.id)
    res.json(results)
  }
}
import { Request, Response } from "express"

export default function (userRepo) {
  return async function (req: Request, res: Response) {
    // here we will have logic to delete a user by a given user id
    console.log("Delete user")
    console.log("--------------------------")
    const results = await userRepo.delete(req.params.id)
    res.json(results)
  }
}
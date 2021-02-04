import { Request, Response } from "express"

export default function (appRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to return vehicle by id
    console.log(`GET: /api/${config.version}/${config.endpoint}/${req.params.id}`)
    console.log("--------------------------")
    const results = await appRepo.findOne({
      select: ["id", "name", "lat", "long"],
      where: {
        id: req.params.id
      }
    })
    res.json(results)
  }
}

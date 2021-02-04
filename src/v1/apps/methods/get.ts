import { Request, Response } from "express"

export default function (appRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let id = req.params.id
    let es = req.body.params // event source

    // perform
    const object = await appRepo.findOne({
      select: ["id", "domain", "state"],
      where: {
        id
      }
    })

    // add to event source
    es.payload = object
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}

import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    // let id = req.params.id
    let es = req.body.params // event source

    // perform
    const objects = await memberRepo.find()

    // add to event source
    es.payload = objects
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}
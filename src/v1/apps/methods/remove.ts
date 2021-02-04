import { Request, Response } from "express"

export default function (appRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const result = await appRepo.delete({
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state
      }
    })

    // add to event source
    es.payload = result
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}
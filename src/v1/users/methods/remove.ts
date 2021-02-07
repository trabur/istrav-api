import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const result = await memberRepo.delete({
      where: {
        appId: es.arguements.appId,
        email: es.arguements.email
      }
    })

    // add to event source
    es.payload = {
      success: true,
      data: result
    }
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}
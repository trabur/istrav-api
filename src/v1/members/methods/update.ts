import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // respond
    let result

    // perform
    const object = await memberRepo.findOne({
      where: {
        email: es.arguements.email
      }
    })
    memberRepo.merge(object, es.arguements.change)
    result = {
      success: true,
      data: await memberRepo.save(object)
    }

    // add to event source
    es.payload = result
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}
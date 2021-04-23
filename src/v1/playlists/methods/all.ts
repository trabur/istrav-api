import { Request, Response } from "express"

export default function (playlistRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const objects = await playlistRepo.find({
      // relations: ['guides'],
      where: {
        appId: es.arguements.appId
      }
    })

    // add to event source
    es.payload = {
      success: true,
      data: objects
    }
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}
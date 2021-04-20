import { Request, Response } from "express"

export default function (guideRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const object = await guideRepo.findOne({
      relations: ['videos'],
      select: ["id", "name", "slug", "image"],
      where: {
        appId: es.arguements.appId,
        slug: es.arguements.slug
      }
    })

    let result
    if (object) {
      result = {
        data: object,
        success: true
      }
    } else {
      result = {
        reason: 'guide id not found',
        success: false
      }
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

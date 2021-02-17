import { Request, Response } from "express"

export default function (categoryRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const object = await categoryRepo.findOne({
      relations: ['products'],
      where: {
        appId: es.arguements.appId,
        slug: es.arguements.slug
      }
    })

    let result
    if (object) {
      result = {
        data: object.products,
        success: true
      }
    } else {
      result = {
        reason: 'category id not found',
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
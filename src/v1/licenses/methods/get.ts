import { Request, Response } from "express"

export default function (licenseRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const object = await licenseRepo.findOne({
      relations: ['register', 'plan'],
      select: ["id", "key", "raw"],
      where: {
        appId: es.arguements.appId,
        key: es.arguements.key
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
        reason: 'license id not found',
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

import { Request, Response } from "express"

export default function (collectionRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // respond
    let result

    // perform
    const object = await collectionRepo.findOne({
      where: {
        appId: es.arguements.appId,
        slug: es.arguements.slug
      }
    })
    collectionRepo.merge(object, es.arguements.change)
    await collectionRepo.save(object)
      .then((data: any) => {
        console.log('saved: ', data)
        result = {
          success: true,
          data: data
        }
      })
      .catch((err) => {
        console.log('save err:', err)
        result = {
          success: false,
          reason: err.message
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
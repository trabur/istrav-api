import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    let result
    await userRepo.delete({
      where: {
        appId: es.arguements.appId,
        email: es.arguements.email
      }
    })
      .then((data: any) => {
        console.log('deleted: ', data)
        result = {
          success: true,
          data: data
        }
      })
      .catch((err) => {
        console.log('delete err:', err)
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
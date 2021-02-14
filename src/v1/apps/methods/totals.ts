import { Request, Response } from "express"

export default function (appRepo: any, categoryRepo: any, collectionRepo: any, productRepo: any, menuRepo: any, pageRepo: any, userRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const app = await appRepo.findOne({
      select: ["id"],
      where: {
        domain: es.arguements.domain,
        state: es.arguements.state
      }
    })
    const categoriesCount = await categoryRepo.count({
      where: {
        appId: app.id
      }
    })
    const collectionsCount = await collectionRepo.count({
      where: {
        appId: app.id
      }
    })
    const productsCount = await productRepo.count({
      where: {
        appId: app.id
      }
    })
    const menusCount = await menuRepo.count({
      where: {
        appId: app.id
      }
    })
    const pagesCount = await pageRepo.count({
      where: {
        appId: app.id
      }
    })
    const usersCount = await userRepo.count({
      where: {
        appId: app.id
      }
    })

    // add to event source
    es.payload = {
      success: true,
      data: {
        categoriesCount,
        collectionsCount,
        productsCount,
        menusCount,
        pagesCount,
        usersCount
      }
    }
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}

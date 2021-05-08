import { Request, Response } from "express"

export default function (blockRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // perform
    const object = await blockRepo.findOne({
      relations: ["application", "category", "collection", "product", "menu", "video", "guide", "playlist", "plan", "faq", "user", "page"],
      select: ["id", "name", "slug", "raw", "type", "component", "applicationId", "categoryId", "collectionId", "productId", "menuId", "videoId", "guideId", "playlistId", "planId", "faqId", "userId", "pageId"],
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
        reason: 'block id not found',
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

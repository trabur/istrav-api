import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export default function (appRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)

    // check for duplicate key
    const dupKey = await appRepo.findOne({
      select: ["id", "domain", "state"],
      where: {
        domain: es.arguements.change.domain,
        state: es.arguements.change.state
      }
    })
    console.log('dupKey:', dupKey)

    // check for valid domain name
    function CheckIsValidDomain(domain) { 
      var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
      return domain.match(re);
    }

    // respond
    let result

    // check
    if (CheckIsValidDomain(es.arguements.change.domain)) {
      if (dupKey) {
        result = {
          success: false,
          reason: 'a member with that domain & state already exists'
        }
      } else {
        // app owner is member id from token
        es.arguements.change.ownerId = decoded.memberId
    
        // perform
        const object = await appRepo.create(es.arguements.change)
        await appRepo.save(object)
          .then((data) => {
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
      }
    } else {
      result = {
        success: false,
        reason: 'Domain Name must be valid; for example: "istrav.com"'
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

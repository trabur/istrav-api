import sha512 from 'crypto-js/sha512'
import { Request, Response } from "express"

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // convert password to hash
    es.arguements.password = sha512(es.arguements.password).toString()

    // perform
    const existingEmail = await userRepo.findOne({
      select: ["email"],
      where: {
        appId: es.arguements.appId,
        email: es.arguements.email
      }
    })

    const existingUsername = await userRepo.findOne({
      select: ["username"],
      where: {
        appId: es.arguements.appId,
        username: es.arguements.username
      }
    })

    const existingName = await userRepo.findOne({
      select: ["firstName", "lastName"],
      where: {
        appId: es.arguements.appId,
        firstName: es.arguements.firstName,
        lastName: es.arguements.lastName
      }
    })

    let result
    if (existingEmail) {
      result = {
        success: false,
        reason: 'a user with that email already exists'
      }
    } else if (existingUsername) {
      result = {
        success: false,
        reason: 'a user with that username already exists'
      }
    } else if (existingName) {
      result = {
        success: false,
        reason: 'a user with that first & last name already exists'
      }
    } else {
      const user = await userRepo.create(es.arguements)
      await userRepo.save(user)
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
    
    // add to event source
    es.payload = result
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)

  }
}
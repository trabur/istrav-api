import sha512 from 'crypto-js/sha512'
import { Request, Response } from "express"

export default function (memberRepo, config) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // convert password to hash
    es.arguements.password = sha512(es.arguements.password).toString()

    // perform
    const existingEmail = await memberRepo.findOne({
      select: ["email"],
      where: {
        email: es.arguements.email
      }
    })

    const existingUsername = await memberRepo.findOne({
      select: ["username"],
      where: {
        username: es.arguements.username
      }
    })

    const existingName = await memberRepo.findOne({
      select: ["firstName", "lastName"],
      where: {
        firstName: es.arguements.firstName,
        lastName: es.arguements.lastName
      }
    })

    let result
    if (existingEmail) {
      result = {
        success: false,
        reason: 'an member with that email already exists'
      }
    } else if (existingUsername) {
      result = {
        success: false,
        reason: 'a member with that username already exists'
      }
    } else if (existingName) {
      result = {
        success: false,
        reason: 'a member with that first & last name already exists'
      }
    } else {
      const user = await memberRepo.create(es.arguements)
      result = {
        success: true,
        data: await memberRepo.save(user)
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
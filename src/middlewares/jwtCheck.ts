import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import configuration from "../config/config";

export const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const authHeader = req.headers["authorization"]
  let token = authHeader.split(' ')[1]

  if (token === null) return res.sendStatus(401)
  let jwtPayload
  
  // Try to validate the token and get data
  jwt.verify(token, configuration.jwtSecret, function (err, user) {
    if (err) return res.sendStatus(403)
    req.user = user
    console.log('verify', user)
    next()
  })
}
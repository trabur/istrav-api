import upload from "./methods/upload"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'files'
let config = { component, version }

import fileUpload from 'express-fileupload'

export default function (app, appRepo) {
  app.use(fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 },
  }))
  app.post(`/${version}/${component}/upload`, upload(config, appRepo))
}
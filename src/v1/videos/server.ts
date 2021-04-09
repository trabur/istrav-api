import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'videos'
let config = { component, version }

export default function (app, videoRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(videoRepo, config))
  app.post(`/${version}/${component}/save`, save(videoRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(videoRepo, config))
  app.post(`/${version}/${component}/update`, update(videoRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(videoRepo, appRepo, config))
}
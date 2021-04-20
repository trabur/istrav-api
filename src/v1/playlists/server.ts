import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"
import guides from "./methods/guides"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'playlists'
let config = { component, version }

export default function (app, guideRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(guideRepo, config))
  app.post(`/${version}/${component}/save`, save(guideRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(guideRepo, config))
  app.post(`/${version}/${component}/update`, update(guideRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(guideRepo, appRepo, config))
  app.post(`/${version}/${component}/guides`, guides(guideRepo, config))
}
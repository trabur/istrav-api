import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"
import demo from "./methods/demo"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'apps'
let config = { endpoint, version }

export default function (app, appRepo) {
  app.post(`/${version}/${endpoint}/all`, all(appRepo, config))
  app.post(`/${version}/${endpoint}/save`, save(appRepo, config))
  app.post(`/${version}/${endpoint}/get`, get(appRepo, config))
  app.post(`/${version}/${endpoint}/update`, update(appRepo, config))
  app.post(`/${version}/${endpoint}/remove`, remove(appRepo, config))
  app.post(`/${version}/${endpoint}/demo`, demo(appRepo, config))
}
import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"
import endpoint from "./methods/endpoint"
import totals from "./methods/totals"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'apps'
let config = { endpoint, version }

export default function (app, appRepo, categoryRepo, collectionRepo, productRepo, menuRepo, pageRepo, userRepo) {
  app.post(`/${version}/${component}/all`, all(appRepo, config))
  app.post(`/${version}/${component}/save`, save(appRepo, config))
  app.post(`/${version}/${component}/get`, get(appRepo, config))
  app.post(`/${version}/${component}/update`, update(appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(appRepo, config))
  app.post(`/${version}/${component}/endpoint`, endpoint(appRepo, config))
  app.post(`/${version}/${component}/totals`, totals(appRepo, categoryRepo, collectionRepo, productRepo, menuRepo, pageRepo, userRepo, config))
}
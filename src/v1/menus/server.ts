import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'menus'
let config = { component, version }

export default function (app, menuRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(menuRepo, config))
  app.post(`/${version}/${component}/save`, save(menuRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(menuRepo, config))
  app.post(`/${version}/${component}/update`, update(menuRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(menuRepo, appRepo, config))
}
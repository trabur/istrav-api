import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'categories'
let config = { component, version }

export default function (app, categoryRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(categoryRepo, config))
  app.post(`/${version}/${component}/save`, save(categoryRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(categoryRepo, config))
  app.post(`/${version}/${component}/update`, update(categoryRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(categoryRepo, appRepo, config))
  app.post(`/${version}/${component}/products`, remove(categoryRepo, appRepo, config))
}
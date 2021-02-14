import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'products'
let config = { component, version }

export default function (app, productRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(productRepo, config))
  app.post(`/${version}/${component}/save`, save(productRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(productRepo, config))
  app.post(`/${version}/${component}/update`, update(productRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(productRepo, appRepo, config))
}
import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'carts'
let config = { component, version }

export default function (app, cartRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(cartRepo, config))
  app.post(`/${version}/${component}/save`, save(cartRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(cartRepo, config))
  app.post(`/${version}/${component}/update`, update(cartRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(cartRepo, appRepo, config))
}
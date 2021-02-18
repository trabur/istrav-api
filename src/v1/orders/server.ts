import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'products'
let config = { component, version }

export default function (app, orderRep, appRepo) {
  app.post(`/${version}/${component}/all`, all(orderRep, config))
  app.post(`/${version}/${component}/save`, save(orderRep, appRepo, config))
  app.post(`/${version}/${component}/get`, get(orderRep, config))
  app.post(`/${version}/${component}/update`, update(orderRep, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(orderRep, appRepo, config))
}
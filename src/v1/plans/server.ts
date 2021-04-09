import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'plans'
let config = { component, version }

export default function (app, planRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(planRepo, config))
  app.post(`/${version}/${component}/save`, save(planRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(planRepo, config))
  app.post(`/${version}/${component}/update`, update(planRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(planRepo, appRepo, config))
}
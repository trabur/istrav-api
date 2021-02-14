import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'vehicles'
let config = { component, version }

export default function (app, vehicleRepo) {
  app.post(`/${version}/${component}/all`, all(vehicleRepo, config))
  app.post(`/${version}/${component}/save`, save(vehicleRepo, config))
  app.post(`/${version}/${component}/get/:id`, get(vehicleRepo, config))
  app.post(`/${version}/${component}/update/:id`, update(vehicleRepo, config))
  app.post(`/${version}/${component}/remove/:id`, remove(vehicleRepo, config))
}
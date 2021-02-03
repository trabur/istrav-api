import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'vehicles'
let config = { endpoint, version }

export default function (app, vehicleRepo) {
  app.post(`/${version}/${endpoint}/all`, all(vehicleRepo, config))
  app.post(`/${version}/${endpoint}/save`, save(vehicleRepo, config))
  app.post(`/${version}/${endpoint}/get/:id`, get(vehicleRepo, config))
  app.post(`/${version}/${endpoint}/update/:id`, update(vehicleRepo, config))
  app.post(`/${version}/${endpoint}/remove/:id`, remove(vehicleRepo, config))
}
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
  app.get(`/${version}/${endpoint}`, jwtCheck, all(vehicleRepo, config))
  app.get(`/${version}/${endpoint}/:id`, get(vehicleRepo, config))
  app.post(`/${version}/${endpoint}`, save(vehicleRepo, config))
  app.put(`/${version}/${endpoint}/:id`, update(vehicleRepo, config))
  app.delete(`/${version}/${endpoint}/:id`, remove(vehicleRepo, config))
  // app.delete(`/v1/vehicles/:id`, [checkJwt, checkRole(["ADMIN"])], deleteVehicle(vehicleRepo))
}
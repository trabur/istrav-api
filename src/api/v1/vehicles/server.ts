import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import jwtCheck from "../../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'vehicles'
let config = { endpoint, version }

export default function (app, vehicleRepo) {
  app.get(`/api/${version}/${endpoint}`, all(vehicleRepo, config))
  app.get(`/api/${version}/${endpoint}/:id`, get(vehicleRepo, config))
  app.post(`/api/${version}/${endpoint}`, save(vehicleRepo, config))
  app.put(`/api/${version}/${endpoint}/:id`, update(vehicleRepo, config))
  app.delete(`/api/${version}/${endpoint}/:id`, jwtCheck, remove(vehicleRepo, config))
  // app.delete(`/api/v1/vehicles/:id`, [checkJwt, checkRole(["ADMIN"])], deleteVehicle(vehicleRepo))
}
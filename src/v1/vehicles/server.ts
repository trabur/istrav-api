import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";

const endpoint = 'vehicles'
const version = 'v1'

export default function (app, vehicleRepo) {
  app.get(`/api/${version}/${endpoint}`, all(vehicleRepo))
  app.get(`/api/${version}/${endpoint}/:id`, get(vehicleRepo))
  app.post(`/api/${version}/${endpoint}`, save(vehicleRepo))
  app.put(`/api/${version}/${endpoint}/:id`, update(vehicleRepo))
  app.delete(`/api/${version}/${endpoint}/:id`, remove(vehicleRepo))
  // app.delete(`/api/v1/vehicles/:id`, [checkJwt, checkRole(["ADMIN"])], deleteVehicle(vehicleRepo))
}
import get from './methods/get'
import register from './methods/register'
import login from './methods/login'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'users'
let config = { endpoint, version }

export default function (app, userRepo) {
  app.get(`/api/${version}/${endpoint}`, all(userRepo, config))
  app.get(`/api/${version}/${endpoint}/:email`, get(userRepo, config))
  app.post(`/api/${version}/${endpoint}`, register(userRepo, config))
  app.post(`/api/${version}/${endpoint}/login`, login(userRepo, config))
  app.put(`/api/${version}/${endpoint}/:email`, update(userRepo, config))
  app.delete(`/api/${version}/${endpoint}/:email`, remove(userRepo, config))
  // app.delete(`/api/v1/users/:id`, [checkJwt, checkRole(["ADMIN"])], deleteVehicle(userRepo))
}
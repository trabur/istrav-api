import get from './methods/get'
import register from './methods/register'
import login from './methods/login'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'members'
let config = { component, version }

export default function (app, userRepo) {
  app.post(`/${version}/${component}/all`, all(userRepo, config))
  app.post(`/${version}/${component}/register`, register(userRepo, config))
  app.post(`/${version}/${component}/login`, login(userRepo, config))
  app.post(`/${version}/${component}/get`, get(userRepo, config))
  app.post(`/${version}/${component}/update`, update(userRepo, config))
  app.post(`/${version}/${component}/remove`, remove(userRepo, config))
}
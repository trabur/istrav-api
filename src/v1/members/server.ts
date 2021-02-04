import get from './methods/get'
import register from './methods/register'
import login from './methods/login'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'members'
let config = { endpoint, version }

export default function (app, userRepo) {
  app.post(`/${version}/${endpoint}/all`, all(userRepo, config))
  app.post(`/${version}/${endpoint}/register`, register(userRepo, config))
  app.post(`/${version}/${endpoint}/login`, login(userRepo, config))
  app.post(`/${version}/${endpoint}/get/:id`, get(userRepo, config))
  app.post(`/${version}/${endpoint}/update/:id`, update(userRepo, config))
  app.post(`/${version}/${endpoint}/remove/:id`, remove(userRepo, config))
}
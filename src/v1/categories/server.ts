import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'categories'
let config = { endpoint, version }

export default function (app, categoryRepo) {
  app.post(`/${version}/${endpoint}/all`, all(categoryRepo, config))
  app.post(`/${version}/${endpoint}/save`, save(categoryRepo, config))
  app.post(`/${version}/${endpoint}/get`, get(categoryRepo, config))
  app.post(`/${version}/${endpoint}/update`, update(categoryRepo, config))
  app.post(`/${version}/${endpoint}/remove`, remove(categoryRepo, config))
}
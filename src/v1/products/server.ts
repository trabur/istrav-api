import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'products'
let config = { endpoint, version }

export default function (app, productRepo) {
  app.post(`/${version}/${endpoint}/all`, all(productRepo, config))
  app.post(`/${version}/${endpoint}/save`, save(productRepo, config))
  app.post(`/${version}/${endpoint}/get`, get(productRepo, config))
  app.post(`/${version}/${endpoint}/update`, update(productRepo, config))
  app.post(`/${version}/${endpoint}/remove`, remove(productRepo, config))
}
import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"
import blocks from "./methods/blocks"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'pages'
let config = { component, version }

export default function (app, pageRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(pageRepo, config))
  app.post(`/${version}/${component}/save`, save(pageRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(pageRepo, config))
  app.post(`/${version}/${component}/update`, update(pageRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(pageRepo, appRepo, config))
  app.post(`/${version}/${component}/blocks`, blocks(pageRepo, appRepo, config))
}
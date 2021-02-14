import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'collections'
let config = { component, version }

export default function (app, collectionRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(collectionRepo, config))
  app.post(`/${version}/${component}/save`, save(collectionRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(collectionRepo, config))
  app.post(`/${version}/${component}/update`, update(collectionRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(collectionRepo, appRepo, config))
}
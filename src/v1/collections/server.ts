import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'collections'
let config = { endpoint, version }

export default function (app, collectionRepo) {
  app.post(`/${version}/${endpoint}/all`, all(collectionRepo, config))
  app.post(`/${version}/${endpoint}/save`, save(collectionRepo, config))
  app.post(`/${version}/${endpoint}/get`, get(collectionRepo, config))
  app.post(`/${version}/${endpoint}/update`, update(collectionRepo, config))
  app.post(`/${version}/${endpoint}/remove`, remove(collectionRepo, config))
}
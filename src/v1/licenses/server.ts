import get from './methods/get'
import save from './methods/save'
import all from "./methods/all"
import update from "./methods/update"
import remove from "./methods/remove"

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'licenses'
let config = { component, version }

export default function (app, licenseRepo, appRepo) {
  app.post(`/${version}/${component}/all`, all(licenseRepo, config))
  app.post(`/${version}/${component}/save`, save(licenseRepo, appRepo, config))
  app.post(`/${version}/${component}/get`, get(licenseRepo, config))
  app.post(`/${version}/${component}/update`, update(licenseRepo, appRepo, config))
  app.post(`/${version}/${component}/remove`, remove(licenseRepo, appRepo, config))
}
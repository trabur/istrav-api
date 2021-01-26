// import publish from './methods/publish'

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'logging'
let config = { endpoint, version }

export default function (app, userRepo) {
  // app.post(`/${version}/${endpoint}/publish/:queue`, publish(userRepo, config))
}
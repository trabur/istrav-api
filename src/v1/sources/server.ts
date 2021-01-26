import publish from './methods/publish'
import check from './methods/check'

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'sources'
let config = { endpoint, version }

export default function (app, channel) {
  app.post(`/${version}/${endpoint}/publish/:queue`, publish(channel, config))
  app.post(`/${version}/${endpoint}/consume/:queue`, publish(channel, config))
  app.post(`/${version}/${endpoint}/check/:queue`, check(channel, config))
}
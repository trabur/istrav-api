import check from './methods/check'
import cosume from './methods/publish'
import publish from './methods/publish'

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'sources'
let config = { endpoint, version }

export default function (app, channel) {
  app.get(`/${version}/${endpoint}/check/:queue`, check(channel, config))
  app.post(`/${version}/${endpoint}/consume/:queue`, consume(channel, config))
  app.post(`/${version}/${endpoint}/publish/:queue`, publish(channel, config))
}
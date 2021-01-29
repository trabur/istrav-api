import check from './methods/check'
import consume from './methods/consume'
import publish from './methods/publish'

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'sources'
let config = { endpoint, version }

export default function (app, amqp) {
  app.post(`/${version}/${endpoint}/check/:id`, check(amqp, config))
  app.post(`/${version}/${endpoint}/consume/:id`, consume(amqp, config))
  app.post(`/${version}/${endpoint}/publish/:id`, publish(amqp, config))
}
import check from './methods/check'
import consume from './methods/consume'
import publish from './methods/publish'

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const component = 'sources'
let config = { component, version }

export default function (app, amqp) {
  app.post(`/${version}/${component}/check/:id`, check(amqp, config))
  app.post(`/${version}/${component}/consume/:id`, consume(amqp, config))
  app.post(`/${version}/${component}/publish/:id`, publish(amqp, config))
}
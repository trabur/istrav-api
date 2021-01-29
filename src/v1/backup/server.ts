import load from './methods/load'
import save from './methods/save'

import { jwtCheck } from "../../middlewares/jwtCheck"
import version from '../version.json'

const endpoint = 'backup'
let config = { endpoint, version }

export default function (app, amqp, mongodb) {
  app.post(`/${version}/${endpoint}/save`, save(amqp, mongodb, config))
  app.post(`/${version}/${endpoint}/load`, load(amqp, mongodb, config))
}
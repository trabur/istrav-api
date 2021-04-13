// import load from './methods/load'
// import save from './methods/save'

// import { jwtCheck } from "../../middlewares/jwtCheck"
// import version from '../version.json'

// const component = 'backup'
// let config = { component, version }

// export default function (app, amqp, mongodb) {
//   app.post(`/${version}/${component}/save`, save(amqp, mongodb, config))
//   app.post(`/${version}/${component}/load`, load(amqp, mongodb, config))
// }
// import { Request, Response } from "express"

// export default function (amqp, config) {
//   return async function (req: Request, res: Response) {
//     // params
//     let id = req.params.id
//     let es = req.body.params // event source
//     let options = {
//       noAck: es.arguements.noAck
//     }

//     function pull (ok) {
//       if (ok.messageCount > 0) {
//         // yes event source
//         amqp
//           .get(id, options)
//           .then(function (msg) {
//             // return event source
//             es.payload = JSON.parse(msg.content)
//             es.serverAt = Date.now()

//             // log event source
//             console.log(`API ${es.arguements.url} ::: ${es}`)

//             // finish
//             res.json(es)
//           })
//       } else {
//         // return no event source
//         es.payload = null
//         es.serverAt = Date.now()

//         // log event source
//         console.log(`API ${es.arguements.url} ::: ${es}`)

//         // finish
//         res.json(es)
//       }
//     }

//     // rabbitmq
//     amqp
//       .assertQueue(id)
//       .then(pull)
//   }
// }
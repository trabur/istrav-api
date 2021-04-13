// import { Request, Response } from "express"

// export default function (amqp, config) {
//   return async function (req: Request, res: Response) {
//     // params
//     let id = req.params.id
//     let es = req.body.params // event source
//     let data = JSON.stringify(es.arguements.body)

//     let send = async function (ok) {
//       // add to event source queue
//       await amqp.sendToQueue(id, Buffer.from(data))
//       es.serverAt = Date.now()

//       // log event source
//       console.log(`API ${es.arguements.url} ::: ${es}`)

//       // finish
//       res.json(es)
//     }

//     // rabbitmq
//     amqp
//       .assertQueue(id)
//       .then(send)
//   }
// }
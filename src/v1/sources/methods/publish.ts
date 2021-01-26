import { Request, Response } from "express"

// rabbitmq
var open = require('amqplib').connect('amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef');

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
    console.log(`UPDATE: /${config.version}/${config.endpoint}/publish/:queue`)
    console.log("--------------------------")
    // console.log('req.body.params:', req.body.params)
    // userRepo.merge(user, req.body.params)
    // const results = await userRepo.save(user)
    
    // event source
    let name = req.params.queue
    let data = JSON.stringify(req.body.params)

    // Publisher
    let results = open.then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      return ch.assertQueue(name).then(function(ok) {
        return ch.sendToQueue(name, Buffer.from(data));
      });
    }).catch(console.warn);

    res.json({
      name,
      results
    })
  }
}
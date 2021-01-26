import { Request, Response } from "express"

// rabbitmq
var open = require('amqplib').connect('amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef');
var q = 'tasks';

export default function (userRepo, config) {
  return async function (req: Request, res: Response) {
    // here we will have logic to update a user by a given user id
    console.log(`UPDATE: /${config.version}/${config.endpoint}/publish`)
    console.log("--------------------------")
    console.log('req.body.params:', req.body.params)
    // const user = await userRepo.findOne(req.params.email)
    // userRepo.merge(user, req.body.params)
    // const results = await userRepo.save(user)

    // Publisher
    let results = open.then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      return ch.assertQueue(q).then(function(ok) {
        return ch.sendToQueue(q, Buffer.from('something to do'));
      });
    }).catch(console.warn);

    res.json(results)
  }
}
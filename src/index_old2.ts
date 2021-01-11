import * as Amqp from "amqp-ts"
import { v4 as uuidv4 } from 'uuid';

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
 
var connection = new Amqp.Connection("amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef")

class Users {
  constructor () {
    let exchange = connection.declareExchange("usersExchange")
    let queue = connection.declareQueue("usersQueue", { durable: false })
    queue.bind(exchange)
    queue.activateConsumer((message) => {
      console.log(message.getContent())
      message.ack()
    });
    
    connection.completeConfiguration().then(() => {
      // the following message will be received because
      // everything you defined earlier for this connection now exists
      var msg2 = new Amqp.Message("Test2")
      exchange.send(msg2)
    });

    this.exchange = exchange
    this.queue = queue
    this.connection = connection
  }

  exchange = null
  queue = null
  connection = null
  users = [{
    email: 'travis.burandt@gmail.com',
    username: 'istrav',
    password: ''
  }]

  login (email, password) {
    if () {
      this.users.
    }
  }
  register (email, username, password) {
    // convert password to hash
    let pw = sha512(password).toString()

    let user = {
      email: email,
      username: username,
      password: pw
    }
    db.set(user)
  }
  findMany (filter, sortBy, take, skip) {
    let users = db.get('users')
      .filter(filter)
      .sortBy(sortBy)
      .take(take)
      .skip(skip)
      .value()
    return users
  }
}

let users = new Users()

let email = 'travis.burandt@gmail.com'
let password = ''
let user = users.login(email, password)




"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Amqp = __importStar(require("amqp-ts"));
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
var connection = new Amqp.Connection("amqps://eogqfdef:Z7sQOuxd2cRIogSBgD0TZtMXfMjUY5og@owl.rmq.cloudamqp.com/eogqfdef");
class Users {
    constructor() {
        this.exchange = null;
        this.queue = null;
        this.connection = null;
        this.users = [{
                email: 'travis.burandt@gmail.com',
                username: 'istrav',
                password: ''
            }];
        let exchange = connection.declareExchange("usersExchange");
        let queue = connection.declareQueue("usersQueue", { durable: false });
        queue.bind(exchange);
        queue.activateConsumer((message) => {
            console.log(message.getContent());
            message.ack();
        });
        connection.completeConfiguration().then(() => {
            // the following message will be received because
            // everything you defined earlier for this connection now exists
            var msg2 = new Amqp.Message("Test2");
            exchange.send(msg2);
        });
        this.exchange = exchange;
        this.queue = queue;
        this.connection = connection;
    }
    login(email, password) {
        if () {
            this.users.
            ;
        }
    }
    register(email, username, password) {
        // convert password to hash
        let pw = sha512(password).toString();
        let user = {
            email: email,
            username: username,
            password: pw
        };
        db.set(user);
    }
    findMany(filter, sortBy, take, skip) {
        let users = db.get('users')
            .filter(filter)
            .sortBy(sortBy)
            .take(take)
            .skip(skip)
            .value();
        return users;
    }
}
let users = new Users();
let email = 'travis.burandt@gmail.com';
let password = '';
let user = users.login(email, password);
//# sourceMappingURL=index_old2.js.map
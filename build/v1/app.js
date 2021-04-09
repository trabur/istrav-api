"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
// endpoints
const server_1 = __importDefault(require("./sources/server"));
const server_2 = __importDefault(require("./backup/server"));
const server_3 = __importDefault(require("./logging/server"));
const server_4 = __importDefault(require("./users/server"));
const server_5 = __importDefault(require("./vehicles/server"));
const server_6 = __importDefault(require("./apps/server"));
const server_7 = __importDefault(require("./members/server"));
const server_8 = __importDefault(require("./products/server"));
const server_9 = __importDefault(require("./categories/server"));
const server_10 = __importDefault(require("./collections/server"));
const server_11 = __importDefault(require("./menus/server"));
const server_12 = __importDefault(require("./pages/server"));
const server_13 = __importDefault(require("./carts/server"));
const server_14 = __importDefault(require("./orders/server"));
const server_15 = __importDefault(require("./licenses/server"));
const server_16 = __importDefault(require("./plans/server"));
const server_17 = __importDefault(require("./videos/server"));
const server_18 = __importDefault(require("./guides/server"));
const server_19 = __importDefault(require("./files/server"));
// entities
const Model_1 = __importDefault(require("./users/Model"));
const Model_2 = __importDefault(require("./vehicles/Model"));
const Model_3 = __importDefault(require("./apps/Model"));
const Model_4 = __importDefault(require("./members/Model"));
const Model_5 = __importDefault(require("./products/Model"));
const Model_6 = __importDefault(require("./categories/Model"));
const Model_7 = __importDefault(require("./collections/Model"));
const Model_8 = __importDefault(require("./menus/Model"));
const Model_9 = __importDefault(require("./pages/Model"));
const Model_10 = __importDefault(require("./carts/Model"));
const Model_11 = __importDefault(require("./orders/Model"));
const Model_12 = __importDefault(require("./licenses/Model"));
const Model_13 = __importDefault(require("./plans/Model"));
const Model_14 = __importDefault(require("./videos/Model"));
const Model_15 = __importDefault(require("./guides/Model"));
// load "process.env" params from a .env file
const dotenv = require('dotenv');
dotenv.config();
// rabbitmq
var open = require('amqplib').connect(process.env.AMQP_URI);
// mongodb
const MongoClient = require('mongodb').MongoClient(process.env.MONGODB_URI, {
    useUnifiedTopology: true
});
const assert = require('assert');
// an sql connection
function typeormRepo(app, connection) {
    // create mongodb connection
    MongoClient.connect(function (err, mongodb) {
        // make sure there is a mongodb client
        assert.equal(null, err);
        console.log("Connected successfully to mongodb");
        // repos
        const userRepo = connection.getRepository(Model_1.default);
        const memberRepo = connection.getRepository(Model_4.default);
        const appRepo = connection.getRepository(Model_3.default);
        const menuRepo = connection.getRepository(Model_8.default);
        const pageRepo = connection.getRepository(Model_9.default);
        const vehicleRepo = connection.getRepository(Model_2.default);
        const categoryRepo = connection.getRepository(Model_6.default);
        const collectionRepo = connection.getRepository(Model_7.default);
        const productRepo = connection.getRepository(Model_5.default);
        const cartRepo = connection.getRepository(Model_10.default);
        const orderRepo = connection.getRepository(Model_11.default);
        const licenseRepo = connection.getRepository(Model_12.default);
        const planRepo = connection.getRepository(Model_13.default);
        const videoRepo = connection.getRepository(Model_14.default);
        const guideRepo = connection.getRepository(Model_15.default);
        // decode
        app.use(express_1.default.json());
        // listener functions
        open
            .then(function (conn) {
            // amqp
            return conn.createChannel();
        })
            .then(function (amqp) {
            server_1.default(app, amqp);
            server_2.default(app, amqp, mongodb);
        }).catch(console.warn);
        server_3.default(app, userRepo);
        server_4.default(app, userRepo);
        server_5.default(app, vehicleRepo);
        server_6.default(app, appRepo, categoryRepo, collectionRepo, productRepo, menuRepo, pageRepo, userRepo, licenseRepo, planRepo);
        server_11.default(app, menuRepo, appRepo);
        server_12.default(app, pageRepo, appRepo);
        server_7.default(app, memberRepo);
        server_9.default(app, categoryRepo, appRepo);
        server_10.default(app, collectionRepo, appRepo);
        server_8.default(app, productRepo, appRepo);
        server_13.default(app, cartRepo, appRepo);
        server_14.default(app, orderRepo, appRepo);
        server_15.default(app, licenseRepo, appRepo);
        server_16.default(app, planRepo, appRepo);
        server_17.default(app, videoRepo, appRepo);
        server_18.default(app, guideRepo, appRepo);
        server_19.default(app, appRepo);
        // mongo connection stays open with express:
        // mongoClient.close()
    });
}
// init
function default_1(app) {
    const config = {
        type: "postgres",
        url: process.env.POSTGRESQL_URI,
        entities: [
            Model_1.default,
            Model_2.default,
            Model_3.default,
            Model_8.default,
            Model_9.default,
            Model_4.default,
            Model_5.default,
            Model_6.default,
            Model_7.default,
            Model_10.default,
            Model_11.default,
            Model_12.default,
            Model_13.default,
            Model_14.default,
            Model_15.default
        ],
        logging: ['query', 'schema'],
        synchronize: true
    };
    // create typeorm connection
    typeorm_1.createConnection(config).then((c) => typeormRepo(app, c));
}
exports.default = default_1;
//# sourceMappingURL=app.js.map
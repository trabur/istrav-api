"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require('assert');
const insert = function (db, toCollectionName, event, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the documents collection
        const dbCollection = db.collection(toCollectionName);
        let update = yield dbCollection.updateOne({ id: event.id }, // filter
        { $set: event }, // update
        { upsert: true } // options
        );
        console.log(`collection: ${toCollectionName} --> id: ${event.id}`);
        callback(update);
    });
};
function default_1(amqp, mongodb, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = req.body.params; // event source
            // arguements
            let from = es.arguements.from; // from: 'my-source',  // rabbitmq queue
            let to = es.arguements.to; // to: 'my-storage',   // mongodb collection
            let options = {
                noAck: es.arguements.noAck || false // false = by default messages are removed from the queue
            };
            // mongodb
            const db = mongodb.db('istrav');
            // keep a record of ids for each saved event
            es.record = [];
            function record(msg) {
                // process event source object
                let event = JSON.parse(msg.content);
                console.log('pulled event from rabbitmq:', msg.content.toString());
                // add to event source
                es.record.push(event.id);
                // save data to mongodb
                insert(db, to, event, function (result) {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log('saved event to mongodb:', result.result);
                        yield amqp.ack(msg);
                    });
                });
            }
            function loopPullThenInsert(ok) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log('run loop for message count total:', ok);
                    for (let i = 0; i < ok.messageCount; i++) {
                        // pull rabbitmq message
                        yield amqp
                            .get(from, options)
                            .then(record);
                    }
                });
            }
            // find number of rabbitmq messages in queue
            yield amqp
                .assertQueue(from)
                .then(loopPullThenInsert);
            // note time
            es.serverAt = Date.now();
            // finish
            res.json(es);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=save.js.map
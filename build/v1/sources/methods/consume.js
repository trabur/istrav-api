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
function default_1(amqp, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let id = req.params.id;
            let es = req.body.params; // event source
            let options = {
                noAck: es.arguements.noAck
            };
            function pull(ok) {
                if (ok.messageCount > 0) {
                    // yes event source
                    amqp
                        .get(id, options)
                        .then(function (msg) {
                        // return event source
                        es.payload = JSON.parse(msg.content);
                        es.serverAt = Date.now();
                        // log event source
                        console.log(`API ${es.arguements.url} ::: ${es}`);
                        // finish
                        res.json(es);
                    });
                }
                else {
                    // return no event source
                    es.payload = null;
                    es.serverAt = Date.now();
                    // log event source
                    console.log(`API ${es.arguements.url} ::: ${es}`);
                    // finish
                    res.json(es);
                }
            }
            // rabbitmq
            amqp
                .assertQueue(id)
                .then(pull);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=consume.js.map
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
            let data = JSON.stringify(es.arguements.body);
            let send = function (ok) {
                return __awaiter(this, void 0, void 0, function* () {
                    // add to event source queue
                    yield amqp.sendToQueue(id, Buffer.from(data));
                    es.serverAt = Date.now();
                    // log event source
                    console.log(`API ${es.arguements.url} ::: ${es}`);
                    // finish
                    res.json(es);
                });
            };
            // rabbitmq
            amqp
                .assertQueue(id)
                .then(send);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=publish.js.map
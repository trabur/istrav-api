"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = __importDefault(require("./methods/check"));
const consume_1 = __importDefault(require("./methods/consume"));
const publish_1 = __importDefault(require("./methods/publish"));
const version_json_1 = __importDefault(require("../version.json"));
const component = 'sources';
let config = { component, version: version_json_1.default };
function default_1(app, amqp) {
    app.post(`/${version_json_1.default}/${component}/check/:id`, check_1.default(amqp, config));
    app.post(`/${version_json_1.default}/${component}/consume/:id`, consume_1.default(amqp, config));
    app.post(`/${version_json_1.default}/${component}/publish/:id`, publish_1.default(amqp, config));
}
exports.default = default_1;
//# sourceMappingURL=server.js.map
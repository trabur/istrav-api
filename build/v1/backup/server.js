"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const load_1 = __importDefault(require("./methods/load"));
const save_1 = __importDefault(require("./methods/save"));
const version_json_1 = __importDefault(require("../version.json"));
const component = 'backup';
let config = { component, version: version_json_1.default };
function default_1(app, amqp, mongodb) {
    app.post(`/${version_json_1.default}/${component}/save`, save_1.default(amqp, mongodb, config));
    app.post(`/${version_json_1.default}/${component}/load`, load_1.default(amqp, mongodb, config));
}
exports.default = default_1;
//# sourceMappingURL=server.js.map
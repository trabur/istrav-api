"use strict";
// import publish from './methods/publish'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const version_json_1 = __importDefault(require("../version.json"));
const component = 'logging';
let config = { component, version: version_json_1.default };
function default_1(app, userRepo) {
    // app.post(`/${version}/${component}/publish/:queue`, publish(userRepo, config))
}
exports.default = default_1;
//# sourceMappingURL=server.js.map
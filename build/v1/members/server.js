"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./methods/get"));
const register_1 = __importDefault(require("./methods/register"));
const login_1 = __importDefault(require("./methods/login"));
const all_1 = __importDefault(require("./methods/all"));
const update_1 = __importDefault(require("./methods/update"));
const remove_1 = __importDefault(require("./methods/remove"));
const version_json_1 = __importDefault(require("../version.json"));
const component = 'members';
let config = { component, version: version_json_1.default };
function default_1(app, userRepo) {
    app.post(`/${version_json_1.default}/${component}/all`, all_1.default(userRepo, config));
    app.post(`/${version_json_1.default}/${component}/register`, register_1.default(userRepo, config));
    app.post(`/${version_json_1.default}/${component}/login`, login_1.default(userRepo, config));
    app.post(`/${version_json_1.default}/${component}/get`, get_1.default(userRepo, config));
    app.post(`/${version_json_1.default}/${component}/update`, update_1.default(userRepo, config));
    app.post(`/${version_json_1.default}/${component}/remove`, remove_1.default(userRepo, config));
}
exports.default = default_1;
//# sourceMappingURL=server.js.map
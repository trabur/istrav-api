"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = __importDefault(require("./methods/upload"));
const version_json_1 = __importDefault(require("../version.json"));
const component = 'files';
let config = { component, version: version_json_1.default };
const express_fileupload_1 = __importDefault(require("express-fileupload"));
function default_1(app, appRepo) {
    app.use(express_fileupload_1.default());
    app.post(`/${version_json_1.default}/${component}/upload`, upload_1.default(config, appRepo));
}
exports.default = default_1;
//# sourceMappingURL=server.js.map
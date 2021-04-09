"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./methods/get"));
const save_1 = __importDefault(require("./methods/save"));
const all_1 = __importDefault(require("./methods/all"));
const update_1 = __importDefault(require("./methods/update"));
const remove_1 = __importDefault(require("./methods/remove"));
const endpoint_1 = __importDefault(require("./methods/endpoint"));
const totals_1 = __importDefault(require("./methods/totals"));
const version_json_1 = __importDefault(require("../version.json"));
const component = 'apps';
let config = { endpoint: endpoint_1.default, version: version_json_1.default };
function default_1(app, appRepo, categoryRepo, collectionRepo, productRepo, menuRepo, pageRepo, userRepo, licenseRepo, planRepo) {
    app.post(`/${version_json_1.default}/${component}/all`, all_1.default(appRepo, config));
    app.post(`/${version_json_1.default}/${component}/save`, save_1.default(appRepo, config));
    app.post(`/${version_json_1.default}/${component}/get`, get_1.default(appRepo, config));
    app.post(`/${version_json_1.default}/${component}/update`, update_1.default(appRepo, config));
    app.post(`/${version_json_1.default}/${component}/remove`, remove_1.default(appRepo, config));
    app.post(`/${version_json_1.default}/${component}/endpoint`, endpoint_1.default(appRepo, config));
    app.post(`/${version_json_1.default}/${component}/totals`, totals_1.default(appRepo, categoryRepo, collectionRepo, productRepo, menuRepo, pageRepo, userRepo, licenseRepo, planRepo, config));
}
exports.default = default_1;
//# sourceMappingURL=server.js.map
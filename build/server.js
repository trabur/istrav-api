"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./v1/app"));
const app = express_1.default();
const port = process.env.PORT || 8080;
// cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
// init api
app_1.default(app);
// welcome screen
app.get('/*', express_1.default.static('public'));
// run
app.listen(port, () => {
    console.log("Running server on port:", port);
    console.log("--------------------------");
});
//# sourceMappingURL=server.js.map
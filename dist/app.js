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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
require("reflect-metadata");
const libs_1 = require("./libs");
app.use(express_1.default.json());
app.get("/api/v1/vehicles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = new libs_1.GetVehicleQuery(req.params.id);
    console.log("Getting vehicle");
    console.log("--------------------------");
    const vehicles = yield libs_1.queryService.runQuery(q);
    res.json(vehicles);
}));
app.post("/api/v1/vehicles", (req, res) => {
    const vehicle = { amount: parseFloat(req.body.number), currency: "SEK" };
    const c = new libs_1.CreateVehicleCommand(vehicle);
    // We want to allow maximum throughput so we don't wait for the write to happen before returning a response.
    wait(2000, () => {
        console.log("Creating vehicle", vehicle);
        console.log("--------------------------");
        libs_1.commandService.runCommand(c);
    });
    res.json(vehicle);
});
exports.default = app;
const wait = (timeout, fn) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fn());
        }, timeout);
    });
};
//# sourceMappingURL=app.js.map
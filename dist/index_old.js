"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
const client_1 = require("../prisma/node_modules/.prisma/client");
const prisma = new client_1.PrismaClient();
// elixir socket
var w3cwebsocket = require("websocket").w3cwebsocket;
var Socket = require("phoenix").Socket;
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", {
    params: {
        // this key is shared between channels and listener-functions so keep private!
        key: "BwdiaqCFMxbwJaYyO38sUnBPf1QOm6M3HlbcFoakCfTDdd2u838H1I7dYbA0RCJQFwXg5ScrCX1C2SbFYhfUuT1sFYQdqu6pZaU"
    },
    transport: w3cwebsocket
});
socket.connect();
// phoenix channel
let channel = socket.channel("vault:lobby", {});
channel.join()
    .receive("ok", ({ messages }) => console.log("joined VAULT channel", messages))
    .receive("error", ({ reason }) => console.log("failed to join VAULT channel", reason))
    .receive("timeout", () => console.log("still waiting..."));
const users = __importStar(require("./users"));
const tenants = __importStar(require("./tenants"));
const platforms = __importStar(require("./platforms"));
// import * as services from './services'
users.run(prisma, channel);
tenants.run(prisma, channel);
platforms.publishSubscribe.run(prisma, channel);
platforms.logging.run(prisma, channel);
platforms.counter.run(prisma, channel);
//# sourceMappingURL=index_old.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.login = exports.register = exports.all = exports.run = exports.stop = void 0;
// libraries
var client_1 = require("../prisma/node_modules/.prisma/client");
var prisma = new client_1.PrismaClient();
var uuid_1 = require("uuid");
// elixir socket
var w3cwebsocket = require("websocket").w3cwebsocket;
var Socket = require("phoenix").Socket;
var socket = new Socket("wss://printedbasics.gigalixirapp.com/socket", { transport: w3cwebsocket });
socket.connect();
// phoenix channel
var channel = socket.channel("MAIN", { token: "abc" });
channel.join()
    .receive("ok", function (_a) {
    var messages = _a.messages;
    return console.log("joined MAIN channel", messages);
})
    .receive("error", function (_a) {
    var reason = _a.reason;
    return console.log("failed to join MAIN channel", reason);
})
    .receive("timeout", function () { return console.log("still waiting..."); });
// listener references
var ref1;
var ref2;
var ref3;
var ref4;
// listener functions
var onRegister_1 = __importDefault(require("./users/onRegister"));
var onLogin_1 = __importDefault(require("./users/onLogin"));
var onUsers_1 = __importDefault(require("./users/onUsers"));
var onRemove_1 = __importDefault(require("./users/onRemove"));
/******
 * trigger methods
 ******/
function run() {
    // start listening
    ref1 = channel.on("room:register", onRegister_1.default(prisma, channel));
    ref2 = channel.on("room:login", onLogin_1.default(prisma, channel));
    ref3 = channel.on("room:users", onUsers_1.default(prisma, channel));
    ref4 = channel.on("room:remove", onRemove_1.default(prisma, channel));
}
exports.run = run;
function stop() {
    // quit listening
    channel.off("room:register", ref1);
    channel.off("room:login", ref2);
    channel.off("room:users", ref3);
    channel.off("room:remove", ref4);
}
exports.stop = stop;
/******
 * trigger actions
 ******/
function all(callback) {
    var outputRoom1 = uuid_1.v4();
    channel.on("room:" + outputRoom1, callback);
    channel.push("room:broadcast", {
        room: 'users',
        message: {
            output: outputRoom1
        }
    });
}
exports.all = all;
function register(email, username, password, callback) {
    var outputRoom2 = uuid_1.v4();
    channel.on("room:" + outputRoom2, callback);
    channel.push("room:broadcast", {
        room: 'register',
        message: {
            payload: {
                email: email,
                username: username,
                password: password,
            },
            output: outputRoom2
        }
    });
}
exports.register = register;
function login(email, password, callback) {
    var outputRoom3 = uuid_1.v4();
    channel.on("room:" + outputRoom3, callback);
    channel.push("room:broadcast", {
        room: 'login',
        message: {
            payload: {
                email: email,
                password: password
            },
            output: outputRoom3
        }
    });
}
exports.login = login;
function remove(email, password, callback) {
    var outputRoom4 = uuid_1.v4();
    channel.on("room:" + outputRoom4, callback);
    channel.push("room:broadcast", {
        room: 'remove',
        message: {
            payload: {
                email: email,
                password: password
            },
            output: outputRoom4
        }
    });
}
exports.remove = remove;
//# sourceMappingURL=tenants.js.map
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
const jwt = require('jsonwebtoken');
const sha512_1 = __importDefault(require("crypto-js/sha512"));
// method
function default_1(prisma, channel) {
    // trigger
    return function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            // convert password to hash
            let pw = sha512_1.default(data.message.payload.password).toString();
            // does the account exist?
            const checkExist = yield prisma.user.findUnique({
                where: {
                    email: data.message.payload.email
                }
            });
            // validate account
            let msg;
            if (checkExist) {
                // check username & password combo
                if (checkExist.password !== pw) {
                    // passwords do not match
                    msg = {
                        error: 3,
                        reason: 'invalid password'
                    };
                }
                else {
                    // make json web token for the account
                    msg = {
                        account: checkExist,
                        token: jwt.sign({
                            user: checkExist.id
                        }, '1337-secret-shhhhh', { expiresIn: '1h' })
                    };
                }
            }
            else {
                // account does not exist
                msg = {
                    error: 2,
                    reason: 'invalid email address'
                };
            }
            // respond
            channel.push("room:broadcast", {
                room: data.message.output,
                message: msg
            });
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=onLogin.js.map
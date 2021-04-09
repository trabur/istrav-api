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
const sha512_1 = __importDefault(require("crypto-js/sha512"));
function default_1(userRepo, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = req.body.params; // event source
            // convert password to hash
            es.arguements.password = sha512_1.default(es.arguements.password).toString();
            // perform
            const existingEmail = yield userRepo.findOne({
                select: ["email"],
                where: {
                    appId: es.arguements.appId,
                    email: es.arguements.email
                }
            });
            const existingUsername = yield userRepo.findOne({
                select: ["username"],
                where: {
                    appId: es.arguements.appId,
                    username: es.arguements.username
                }
            });
            const existingName = yield userRepo.findOne({
                select: ["firstName", "lastName"],
                where: {
                    appId: es.arguements.appId,
                    firstName: es.arguements.firstName,
                    lastName: es.arguements.lastName
                }
            });
            let result;
            if (existingEmail) {
                result = {
                    success: false,
                    reason: 'a user with that email already exists'
                };
            }
            else if (existingUsername) {
                result = {
                    success: false,
                    reason: 'a user with that username already exists'
                };
            }
            else if (existingName) {
                result = {
                    success: false,
                    reason: 'a user with that first & last name already exists'
                };
            }
            else {
                const user = yield userRepo.create(es.arguements);
                yield userRepo.save(user)
                    .then((data) => {
                    console.log('saved: ', data);
                    result = {
                        success: true,
                        data: data
                    };
                })
                    .catch((err) => {
                    console.log('save err:', err);
                    result = {
                        success: false,
                        reason: err.message
                    };
                });
            }
            // add to event source
            es.payload = result;
            es.serverAt = Date.now();
            // log event source
            console.log(`API ${es.arguements.url} ::: ${es}`);
            // finish
            res.json(es);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=register.js.map
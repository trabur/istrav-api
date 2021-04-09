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
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(userRepo, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = req.body.params; // event source
            // respond
            let result;
            // perform
            const object = yield userRepo.findOne({
                where: {
                    appId: es.arguements.appId,
                    email: es.arguements.email
                }
            });
            userRepo.merge(object, es.arguements.change);
            yield userRepo.save(object)
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
//# sourceMappingURL=update.js.map
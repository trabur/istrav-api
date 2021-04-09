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
function default_1(planRep, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = req.body.params; // event source
            // perform
            const object = yield planRep.findOne({
                relations: ['licenses'],
                select: ["id", "name", "slug", "price", "details", "purchaseUrl", "raw", "grantMarketing", "grantShop", "grantForum", "grantBlog", "grantPromo", "limitOnlineVisitors", "limitFileStorage", "limitEventSources", "limitDatabaseRecords"],
                where: {
                    appId: es.arguements.appId,
                    slug: es.arguements.slug
                }
            });
            let result;
            if (object) {
                result = {
                    data: object,
                    success: true
                };
            }
            else {
                result = {
                    reason: 'plan id not found',
                    success: false
                };
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
//# sourceMappingURL=get.js.map
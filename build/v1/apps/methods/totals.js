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
function default_1(appRepo, categoryRepo, collectionRepo, productRepo, menuRepo, pageRepo, userRepo, licenseRepo, planRepo, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = req.body.params; // event source
            // perform
            const app = yield appRepo.findOne({
                select: ["id"],
                where: {
                    domain: es.arguements.domain,
                    state: es.arguements.state
                }
            });
            const categoriesCount = yield categoryRepo.count({
                where: {
                    appId: app.id
                }
            });
            const collectionsCount = yield collectionRepo.count({
                where: {
                    appId: app.id
                }
            });
            const productsCount = yield productRepo.count({
                where: {
                    appId: app.id
                }
            });
            const menusCount = yield menuRepo.count({
                where: {
                    appId: app.id
                }
            });
            const pagesCount = yield pageRepo.count({
                where: {
                    appId: app.id
                }
            });
            const usersCount = yield userRepo.count({
                where: {
                    appId: app.id
                }
            });
            const licensesCount = yield licenseRepo.count({
                where: {
                    appId: app.id
                }
            });
            const plansCount = yield planRepo.count({
                where: {
                    appId: app.id
                }
            });
            // add to event source
            es.payload = {
                success: true,
                data: {
                    categoriesCount,
                    collectionsCount,
                    productsCount,
                    menusCount,
                    pagesCount,
                    usersCount,
                    plansCount,
                    licensesCount
                }
            };
            es.serverAt = Date.now();
            // log event source
            console.log(`API ${es.arguements.url} ::: ${es}`);
            // finish
            res.json(es);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=totals.js.map
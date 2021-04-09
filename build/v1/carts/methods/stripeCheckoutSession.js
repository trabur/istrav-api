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
const jwt = __importStar(require("jsonwebtoken"));
const stripe_1 = __importDefault(require("stripe"));
function default_1(cartRepo, appRepo, config) {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = req.body.params; // event source
            // authentication
            let decoded = jwt.verify(es.arguements.token, process.env.SECRET);
            console.log('decoded:', decoded);
            // check if userId from token is the owner to provided cart id
            const cart = yield cartRepo.findOne({
                select: ['id', 'raw'],
                relations: ['app', 'products'],
                where: {
                    id: es.arguements.id,
                    appId: es.arguements.appId,
                    userId: decoded.userId
                }
            });
            if (!cart) {
                // end
                es.payload = {
                    success: false,
                    reason: 'userId from token is not the owner to provided cart id or cart does not exist'
                };
                es.serverAt = Date.now();
                console.log(`API ${es.arguements.url} ::: ${es}`);
                res.json(es);
            }
            // line items
            let li = [];
            cart.products.forEach((product, index) => {
                li.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            images: [`${cart.app.uploads}/${product.image}`],
                        },
                        unit_amount: product.price,
                    },
                    quantity: cart.raw[product.slug],
                });
            });
            let session;
            try {
                let stripe;
                if (cart.app.isStripeTestData) {
                    stripe = new stripe_1.default(cart.app.stripeSecretKeyTest, {
                        apiVersion: '2020-08-27',
                    });
                }
                else {
                    stripe = new stripe_1.default(cart.app.stripeSecretKeyLive, {
                        apiVersion: '2020-08-27',
                    });
                }
                // perform
                session = yield stripe.checkout.sessions.create({
                    billing_address_collection: 'auto',
                    shipping_address_collection: {
                        allowed_countries: ['US', 'CA'],
                    },
                    payment_method_types: ['card'],
                    line_items: li,
                    mode: 'payment',
                    success_url: `https://shop.${cart.app.domain}/checkout/success`,
                    cancel_url: `https://shop.${cart.app.domain}/checkout/cancel`,
                });
            }
            catch (e) {
                es.payload = {
                    success: false,
                    reason: e.raw.message
                };
                es.serverAt = Date.now();
                console.log(`API ${es.arguements.url} ::: ${es}`);
                res.json(es);
            }
            let result;
            if (session) {
                result = {
                    success: true,
                    data: { id: session.id }
                };
            }
            else {
                result = {
                    success: false,
                    reason: 'something went wrong with stripe'
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
//# sourceMappingURL=stripeCheckoutSession.js.map
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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const jwt = __importStar(require("jsonwebtoken"));
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;
aws_sdk_1.default.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});
var s3 = new aws_sdk_1.default.S3();
function default_1(config, appRepo) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // params
            let es = {
                arguements: {
                    appId: undefined,
                    token: undefined,
                    folder: undefined
                },
                payload: {},
                serverAt: null
            };
            es.arguements = req.body;
            console.log('params', es.arguements);
            // authentication
            let decoded = jwt.verify(es.arguements.token, process.env.SECRET);
            console.log('decoded:', decoded);
            // check if memberId from token is the owner to provided appId
            const app = yield appRepo.findOne({
                select: ["id"],
                where: {
                    id: es.arguements.appId,
                    ownerId: decoded.memberId
                }
            });
            if (!app) {
                // end
                es.payload = {
                    success: false,
                    reason: 'memberId from token is not the owner to provided appId or app does not exist'
                };
                es.serverAt = Date.now();
                res.json(es);
            }
            // perform
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.sampleFile;
            uploadPath = `${app.id}/${es.arguements.folder}/${sampleFile.name}`;
            const params = {
                Bucket: 'istrav',
                Key: uploadPath,
                Body: sampleFile.data
            };
            s3.upload(params, function (s3Err, data) {
                if (s3Err)
                    throw s3Err;
                console.log(`File uploaded successfully at ${data.Location}`);
                // end
                es.payload = {
                    success: true,
                    data: data
                };
                es.serverAt = Date.now();
                res.json(es);
            });
            // {"arguements":{"appId":"999b73b4-708b-47db-8569-af1e4953a7b4","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImRkNmUwMjlmLTViODctNDc1My1iMGQ4LTQ0YmQ2ZWE5MTFjNiIsImVtYWlsIjoidHJhdmlzLmJ1cmFuZHRAZ21haWwuY29tIiwiaWF0IjoxNjE3NDk0NjQ2fQ.KSRYzNOUKI1lEINnYOrOQYueAcCI--w3_GPs-B4cmYQ","folder":"something/another"},"payload":{"success":true,"data":{"ETag":"\"e203cd8ad605a367ffba4536022dfa06\"","Location":"https://istrav.s3.amazonaws.com/999b73b4-708b-47db-8569-af1e4953a7b4/something/another/haha.png","key":"999b73b4-708b-47db-8569-af1e4953a7b4/something/another/haha.png","Key":"999b73b4-708b-47db-8569-af1e4953a7b4/something/another/haha.png","Bucket":"istrav"}},"serverAt":1617568802470}
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=upload.js.map
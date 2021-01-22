"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const version_json_1 = __importDefault(require("../version.json"));
class Vehicles {
    constructor(config) {
        this.endpoint = 'vehicles';
        this.host = 'http://localhost:3000';
        this.all = () => {
            let that = this;
            return axios_1.default
                .get(`${this.host}/api/${version_json_1.default}/${this.endpoint}`, {})
                .then(function (response) {
                console.log('all', that.endpoint, response.data);
                return response.data;
            })
                .catch(function (error) {
                console.log('all', that.endpoint, error);
                return error;
            });
        };
        this.save = (params) => {
            let that = this;
            return axios_1.default
                .post(`${this.host}/api/${version_json_1.default}/${this.endpoint}`, {
                params: params
            })
                .then(function (response) {
                console.log('save', that.endpoint, response.data);
                return response.data;
            })
                .catch(function (error) {
                console.log('save', that.endpoint, error);
                return error;
            });
        };
        this.get = (id) => {
            let that = this;
            return axios_1.default
                .get(`${this.host}/api/${version_json_1.default}/${this.endpoint}/${id}`)
                .then(function (response) {
                console.log('get', that.endpoint, response.data);
                return response.data;
            })
                .catch(function (error) {
                console.log('get', that.endpoint, error);
                return error;
            });
        };
        this.update = (id, params) => {
            let that = this;
            return axios_1.default
                .put(`${this.host}/api/${version_json_1.default}/${this.endpoint}/${id}`, {
                params: params
            })
                .then(function (response) {
                console.log('update', that.endpoint, response.data);
                return response.data;
            })
                .catch(function (error) {
                console.log('update', that.endpoint, error);
                return error;
            });
        };
        this.remove = (id) => {
            let that = this;
            return axios_1.default
                .delete(`${this.host}/api/${version_json_1.default}/${this.endpoint}/${id}`)
                .then(function (response) {
                console.log('remove', that.endpoint, response.data);
                return response.data;
            })
                .catch(function (error) {
                console.log('remove', that.endpoint, error);
                return error;
            });
        };
        if (config.host) {
            this.host = config.host;
        }
    }
}
exports.default = Vehicles;
//# sourceMappingURL=Library.js.map
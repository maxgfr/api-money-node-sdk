"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const crypto_1 = require("crypto");
class ApiMoney {
    constructor(config) {
        this.accessKey = config.accessKey;
        this.secretKey = config.secretKey;
        this.version = config.version;
        if (config.mode === 'prod') {
            this.baseUrl = 'https://emoney-services.w-ha.com/api/';
        }
        else {
            this.baseUrl = 'https://test-emoney-services.w-ha.com/api/';
        }
    }
    request(type, endpoint, data) {
        return new Promise((resolve, reject) => {
            const ts = Math.floor(Date.now());
            const toSign = this.accessKey + ':' + ts + ':' + this.version + ':' + JSON.stringify(data);
            const hash = crypto_1.createHmac('sha256', this.secretKey).update(toSign).digest('hex');
            axios_1.default
                .request({
                method: type,
                url: this.baseUrl + endpoint,
                data,
                headers: {
                    Authorization: `AUTH ${this.accessKey}:${ts}:${this.version}:${hash}`,
                    'Content-type': 'application/json',
                },
            })
                .then((response) => resolve(response.data))
                .catch((err) => reject(err.response.data));
        });
    }
}
exports.default = ApiMoney;

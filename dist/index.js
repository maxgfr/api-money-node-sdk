"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const crypto_1 = require("crypto");
class ApiMoney {
    constructor(config) {
        this.access_key = config.access_key;
        this.secret_key = config.secret_key;
        this.version = config.version;
        if (config.mode == 'prod') {
            this.base_url = 'https://emoney-services.w-ha.com/api/';
        }
        else {
            this.base_url = 'https://test-emoney-services.w-ha.com/api/';
        }
    }
    request(type, endpoint, data) {
        return new Promise((resolve, reject) => {
            const ts = Math.floor(Date.now());
            const toSign = this.access_key +
                ':' +
                ts +
                ':' +
                this.version +
                ':' +
                JSON.stringify(data);
            const hash = crypto_1.createHmac('sha256', this.secret_key)
                .update(toSign)
                .digest('hex');
            console.log(hash);
            axios_1.default
                .request({
                method: type,
                url: this.base_url + endpoint,
                data: data,
                headers: {
                    Authorization: 'AUTH ' +
                        this.access_key +
                        ':' +
                        ts +
                        ':' +
                        this.version +
                        ':' +
                        hash,
                    'Content-type': 'application/json',
                },
            })
                .then((response) => resolve(response.data))
                .catch((err) => reject(err.response.data));
        });
    }
}
exports.default = ApiMoney;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const client = new index_1.ApiMoney({
    secretKey: 'your_secretkey',
    accessKey: 'your_accessKey',
    mode: 'dev',
    version: 1,
});
client
    .request('POST', '/accounts/standard', {
    subscriber: {
        lastname: 'Gfr',
        firstname: 'Max',
        birthdate: '1998-01-01',
        birth_country: 'FRA',
        birth_city: 'Paris',
        nationality: 'FRA',
        citizen_us: false,
        fiscal_us: false,
        fiscal_out_france: false,
    },
    address: {
        label1: 'Place de la Concorde',
        zip_code: '75008',
        city: 'Paris',
        country: 'FRA',
    },
    email: 'skuuuu@test.com',
})
    .then((response) => {
    // console.log(response)
})
    .catch((error) => {
    // console.log(error)
});

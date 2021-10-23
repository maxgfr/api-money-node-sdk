# api-money-node-sdk

Un-official node sdk for [api-money.com](https://www.api-money.com/docs)

## Install

```sh
$ npm install api-money-node-sdk
```

## Usage

```ts
const { ApiMoney } = require('api-money-node-sdk')

const client = new ApiMoney({
  secretKey: 'your_secret_key',
  accessKey: 'your_access_key',
  mode: 'dev', // or 'prod'
  version: 1,
})

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
    email: 'max@test.com',
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
```

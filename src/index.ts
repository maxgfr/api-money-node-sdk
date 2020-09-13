import axios, { Method } from 'axios'
import { createHmac } from 'crypto'
import { IConfig } from './@types'

export default class ApiMoney {
  access_key: string
  secret_key: string
  version: number
  base_url: string

  constructor(config: IConfig) {
    this.access_key = config.access_key
    this.secret_key = config.secret_key
    this.version = config.version
    if (config.mode == 'prod') {
      this.base_url = 'https://emoney-services.w-ha.com/api/'
    } else {
      this.base_url = 'https://test-emoney-services.w-ha.com/api/'
    }
  }

  request(type: Method, endpoint: string, data: any) {
    return new Promise((resolve, reject) => {
      const ts = Math.floor(Date.now())
      const toSign =
        this.access_key +
        ':' +
        ts +
        ':' +
        this.version +
        ':' +
        JSON.stringify(data)
      const hash = createHmac('sha256', this.secret_key)
        .update(toSign)
        .digest('hex')
      console.log(hash)
      axios
        .request({
          method: type,
          url: this.base_url + endpoint,
          data: data,
          headers: {
            Authorization:
              'AUTH ' +
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
        .catch((err) => reject(err.response.data))
    })
  }
}

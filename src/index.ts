import axios, { Method } from 'axios'
import { createHmac } from 'crypto'
import { IConfig } from './@types'

export default class ApiMoney {
  accessKey: string
  secretKey: string
  version: number
  baseUrl: string

  constructor(config: IConfig) {
    this.accessKey = config.accessKey
    this.secretKey = config.secretKey
    this.version = config.version
    if (config.mode === 'prod') {
      this.baseUrl = 'https://emoney-services.w-ha.com/api/'
    } else {
      this.baseUrl = 'https://test-emoney-services.w-ha.com/api/'
    }
  }

  request(type: Method, endpoint: string, data: any) {
    return new Promise((resolve, reject) => {
      const ts = Math.floor(Date.now())
      const toSign = this.accessKey + ':' + ts + ':' + this.version + ':' + JSON.stringify(data)
      const hash = createHmac('sha256', this.secretKey).update(toSign).digest('hex')
      axios
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
        .catch((err) => reject(err.response.data))
    })
  }
}

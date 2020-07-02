const axios = require("axios");
const crypto = require('crypto');

module.exports = class ApiMoney {

  constructor(config) {
    this.access_key = config.access_key;
    this.secret_key = config.secret_key;
    this.version = config.version;
    if(config.mode == 'prod') {
      this.base_url = 'https://emoney-services.w-ha.com/api/'
    } else {
      this.base_url = 'https://test-emoney-services.w-ha.com/api/'
    }
  }

  async request(type, endpoint, data) {
      const ts = Math.floor(Date.now());
      const toSign = this.access_key+":"+ts+":"+this.version+":"+JSON.stringify(data)
      const hash = crypto.createHmac('sha256', this.secret_key)
                     .update(toSign)
                     .digest('hex');
      const response = await axios({
          method: type,
          url: this.base_url+endpoint,
          data: data,
          headers: {
              "Authorization": "AUTH "+this.access_key+":"+ts+":"+this.version+":"+hash,
              "Content-type": "application/json"
          },
      });
      return response.data;
  }

};

var request = require('superagent');

var apiRequest = {
  get: function (url) {
    return request
      .get(url)
      .set('Accept', 'application/json')
      .set('Cache-Control', 'no-cache');
  }
};

module.exports = apiRequest;

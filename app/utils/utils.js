var crypto = require("crypto");

var utils = {
  getTimestamp(){
    if (!Date.now) {
        Date.now = function() { return new Date().getTime(); }
    }
    return Math.floor(Date.now() / 1000);
  },
  md5(string){
    return crypto.createHash('md5').update(string).digest('hex');
  },
  isEmpty(obj) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },
  parseURLParams(href) {
    var vars = {};
    var parts = href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
  }
}

module.exports = utils;

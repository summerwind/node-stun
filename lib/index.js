var Client = require('./client'),
    Packet = require('./packet');

module.exports.connect = function connect(port, host) {
  return new Client(port, host);
};

module.exports.method     = Packet.METHOD;
module.exports.attributes = Packet.ATTR;

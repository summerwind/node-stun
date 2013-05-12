var Client = require('./client'),
    Packet = require('./packet');

exports.connect = function connect(port, host) {
    return new Client(port, host);
};

exports.method    = Packet.METHOD;
exports.attribute = Packet.ATTR;

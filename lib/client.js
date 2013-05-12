var dgram  = require('dgram'),
    events = require('events'),
    util   = require('util');

var Packet = require('./packet');

// Client Class
var Client = function(port, host){
    events.EventEmitter.call(this);

    this._port = port;
    this._host = host;

    var socket = dgram.createSocket('udp4');
    socket.on('message', this._onMessage());
    socket.on('error',   this._onError());
    this._socket = socket;
};

// Inherit EventEmitter
util.inherits(Client, events.EventEmitter);

// Close client
Client.prototype.close = function close() {
    this._socket.close();
};

// Send UDP message
Client.prototype.send = function send(buffer, offset, length, port, host, cb) {
    this._socket.send(buffer, offset, length, port, host, cb);
};

// Send STUN request
Client.prototype.request = function request(cb) {
    var packet = new Packet(Packet.BINDING_CLASS, Packet.METHOD.REQUEST, {});
    var message = packet.encode();
    this._socket.send(message, 0, message.length, this._port, this._host, cb);
};

// Send STUN indication
Client.prototype.indicate = function indicate(cb) {
    var packet = new Packet(Packet.BINDING_CLASS, Packet.METHOD.INDICATION, {});
    var message = packet.encode();
    this._socket.send(message, 0, message.length, this._port, this._host, cb);
};

// Receive message handler
Client.prototype._onMessage = function() {
    var self = this;

    return function _onMessage(msg, rinfo) {
        var packet = Packet.decode(msg);

        if (packet === null) {
            self.emit('message', msg, rinfo);
        } else if (packet.method === Packet.METHOD.RESPONSE_E) {
            self.emit('error_response', packet);
        } else {
            self.emit('response', packet);
        }
    };
};

// Error handler
Client.prototype._onError = function() {
    var self = this;

    return function _onError(err) {
        self.emit('error', err);
    };
};

module.exports = Client;

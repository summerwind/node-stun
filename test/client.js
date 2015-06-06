var assert = require('assert');
var stun   = require('../lib');

var port = 19302;
var host = 'stun.l.google.com';

module.exports = {
    "Success": function (test) {
        var client = stun.connect(port, host);

        client.on('response', function(packet){
            client.close();
            var method = stun.method.RESPONSE_S;
            var addr   = false
                || packet.attrs[stun.attributes.MAPPED_ADDRESS] 
                || packet.attrs[stun.attributes.XOR_MAPPED_ADDRESS]
            ;
            test.equal(packet.class, 1);
            test.equal(packet.method, method);
            test.equal(addr.family, 4);
            test.notEqual(addr.port, null);
            test.notEqual(addr.address, null);
            test.done();
        });

        client.request();
    }
};
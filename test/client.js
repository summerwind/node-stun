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
            var attr   = stun.attribute.MAPPED_ADDRESS;
            if (packet.attrs[stun.attribute.XOR_MAPPED_ADDRESS]) {
                attr = stun.attribute.XOR_MAPPED_ADDRESS;
            }

            test.equal(packet.class, 1);
            test.equal(packet.method, method);
            test.equal(packet.attrs[attr].family, 4);
            test.notEqual(packet.attrs[attr].port, null);
            test.notEqual(packet.attrs[attr].address, null);

            test.done();
        });

        client.request();
    }
};

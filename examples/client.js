var dgram = require('dgram'),
    stun  = require('../lib');

var peer = [];

// STUN Server (by Google)
var port = 19302;
var host = 'stun.l.google.com';

// Event Handler
var onRequest = function(){
    console.log('Sending STUN packet');
};

var onError = function(){
    console.log('Error:', err);
};

// Create STUN Client
var client1 = stun.connect(port, host);
client1.on('error', onError);

var client2 = stun.connect(port, host);
client2.on('error', onError);

// Client1: STUN Response event handler
client1.on('response', function(packet){
    console.log('Client1 Received STUN packet:', packet);
    
    // Save NAT Address
    if (Object.prototype.hasOwnProperty.call(packet.attrs,
                                             stun.attribute.MAPPED_ADDRESS))
        peer.push(packet.attrs[stun.attribute.MAPPED_ADDRESS]);
    else if (Object.prototype.hasOwnProperty.call(packet.attrs,
                                                  stun.attribute.XOR_MAPPED_ADDRESS))
        peer.push(packet.attrs[stun.attribute.XOR_MAPPED_ADDRESS]);
    else
        throw new Error('Could not read address from STUN packet');

    // Sending STUN Packet
    client2.request(onRequest);
});

// Client2: STUN Response event handler
client2.on('response', function(packet){
    console.log('Client2 Received STUN packet:', packet);

    // Save NAT Address
    if (Object.prototype.hasOwnProperty.call(packet.attrs,
                                             stun.attribute.MAPPED_ADDRESS))
        peer.push(packet.attrs[stun.attribute.MAPPED_ADDRESS]);
    else if (Object.prototype.hasOwnProperty.call(packet.attrs,
                                                  stun.attribute.XOR_MAPPED_ADDRESS))
        peer.push(packet.attrs[stun.attribute.XOR_MAPPED_ADDRESS]);
    else
        throw new Error('Could not read address from STUN packet');

    // Sending UDP message
    var msg = new Buffer("Hello!");
    for (var i=0; i<10; i++) {
        client1.send(msg, 0, msg.length, peer[1].port, peer[1].address);
        client2.send(msg, 0, msg.length, peer[0].port, peer[0].address);
    }

    // Client close after 2sec
    setTimeout(function(){
        client1.close();
        client2.close();
        console.log('done');
    }, 2000);
});

// Client1: UDP Message event handler
client1.on('message', function(msg, rinfo){
    console.log('Client1 Received UDP message:', msg);
});

// Client2: UDP Message event handler
client2.on('message', function(msg, rinfo){
    console.log('Client2 Received UDP message:', msg);
});

// Sending STUN request
client1.request(onRequest);

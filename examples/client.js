var dgram = require('dgram'),
    stun  = require('../lib');

// STUN Server (by Google)
var port = 19302;
var host = 'stun.l.google.com';

// Create STUN client
var client = stun.connect(port, host);

// STUN Response event handler
client.on('response', function(packet){
    console.log('Received STUN packet:', packet);

    // Get UDP port of NAT router
    var peer_addr = packet.attrs[stun.attributes.MAPPED_ADDRESS];

    // Sending UDP message to NAT router
    var sender = dgram.createSocket('udp4');
    var msg = new Buffer('Hello peer!');
    sender.send(msg, 0, msg.length, peer_addr.port, peer_addr.address);
});

// UDP Message event handler
client.on('message', function(msg, rinfo){
    console.log('Received UDP message:', msg);
    client.close();
});

// Error event handler
client.on('error', function(err){
    console.log('Error:', err);
});

// Sending STUN request
client.request(function(){
    console.log('Request: Sent');
});
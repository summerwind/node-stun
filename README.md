# STUN

Session Traversal Utilities for NAT (STUN) client for Node.js.  

## Installation

    $ npm install stun

## Usage

#### *var client = stun.connect(port, host)*

Creates a UDP connection to STUN server.    
Here is an example that connect to the Google STUN server.

    var stun  = require('stun');
    
    // STUN Server by Google
    var port = 19302;
    var host = 'stun.l.google.com';
    
    // Connect to STUN Server
    var client = stun.connect(port, host);
    
#### *client.request(cb)*

Send a STUN request.    
*cb* is a callback that is fired when the transmission of the STUN client is complete.

#### *client.indicate(cb)*

Send a STUN indication.    
*cb* is a callback that is fired when the transmission of the STUN client is complete.

#### *client.send(buffer, offset, length, port, host, cb)*

Send a UDP message.    
The function of this method is the same as the *send* method of *dgram.Socket*.

#### *Event: 'response'*

Emitted when the client received a success response from STUN server.    
The argument *packet* will be a Object that is represent success response packet. 

#### *Event: 'error_response'*

Emitted when the client received a error response from STUN server.    
The argument *packet* will be a Object that is represent error response packet. 

#### *Event: 'message'*

Emitted when the client received a UDP message that is not a STUN packet.    
Arguments is the same as the *message* event of *dgram* module.

#### *Event: 'error'*

Emitted when an error occurs on UDP socket.

## License

**The MIT License**

Copyright (c) 2013 Moto Ishizawa &lt;summerwind.jp@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

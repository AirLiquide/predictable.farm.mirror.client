/*
  Copyright (C) Air Liquide S.A,  2017-2018
  Author: Sébastien Lalaurette and Cyril Chapellier, La Factory, Creative Foundry
  This file is part of Predictable Farm project.

  The MIT License (MIT)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
   
  See the LICENSE.txt file in this repository for more information.
*/

try {
    var CONFIG = require('./config');
} catch (e) {
    console.log('⚠ Config file missing. Do not forget to copy `config.json.dist` to `config.json`')
    return;
}

var socket = require('/usr/lib/node_modules/socket.io-client')('http://' + CONFIG.server.host + ':3000');
var os = require("os");

var exec = require('child_process').exec;

socket.on('connect', function() {
    socket.emit("get_port", os.hostname());
});

socket.on('disconnect', function() {});

socket.on('open_tunnel', function (port) {
    exec('kill -9 $(pgrep -l ssh)');
    exec('ssh -R 0.0.0.0:' + port + '+:0.0.0.0:22 ' + CONFIG.server.user + '@' + CONFIG.server.host + ' -i id_rsa -y -N');
    socket.emit("tunnel_ok", os.hostname());
});
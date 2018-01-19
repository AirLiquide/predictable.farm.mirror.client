//var socket = require('/usr/lib/node_modules/socket.io-client')('http://mirror.predictable.run:3000');
var socket = require('socket.io-client')('http://localhost:3000');
var os = require("os");

var exec = require('child_process').exec;

socket.on('connect', function() {
    socket.emit("get_port", os.hostname());
});

socket.on('disconnect', function() {});

socket.on('open_tunnel', function (port) {
    exec('ssh -R 0.0.0.0:'+port+'+:0.0.0.0:22 ubuntu@mirror.predictable.run -i id_rsa -y -N');
    socket.emit("tunnel_ok", os.hostname());
});
//var socket = require('/usr/lib/node_modules/socket.io-client')('http://192.168.1.166:3000');
var socket = require('socket.io-client')('http://localhost:3000');
var os = require("os");

var exec = require('child_process').exec;

socket.on('connect', function() {
    console.log("LOL");
    socket.emit("get_port", os.hostname());
});

socket.on('disconnect', function() {});

socket.on('open_tunnel', function (port) {
    exec('ssh -R 0.0.0.0:'+port+'+:0.0.0.0:22 ubuntu@18.195.139.85 -i id_rsa -N', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if(error === null) {
            socket.emit("tunnel_ok", os.hostname());
        }

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});
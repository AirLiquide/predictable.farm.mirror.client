//var socket = require('/usr/lib/node_modules/socket.io-client')('http://18.195.139.85:3000');
var socket = require('socket.io-client')('http://localhost:3000');
var os = require("os");

var exec = require('child_process').exec;

socket.on('connect', function() {
    socket.emit("get_port", os.hostname());
});

socket.on('disconnect', function() {});

socket.on('open_tunnel', function (port) {
    console.log("OPEN A FUCKING TUNNER ON THIS PORT : " + port);

    exec('node -v', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});

socket.on('event', function () {
    console.log("OPEN A FUCKING TUNNER ON THIS PORT : " + port);
});
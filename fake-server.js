var socket = require('socket.io-client')('http://localhost:3000');
const rfid = require("node-rfid");

socket.on('connect', function () {
    console.log("connected!")
});
socket.emit("scan", {

    rfid: 12345,
    machine: 0

});
socket.on("status", data => {

    if (data.status == "authorized") {

        while (true) {

            if (Math.floor(new Date().getTime() / 1000) >= data.end) {

                break;

            }

        }

        console.log("session expired")
        // io.emit("expired")

    } 

});
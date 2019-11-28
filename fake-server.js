var socket = require('socket.io-client')('http://localhost:3000');
const rfid = require("node-rfid");

console.log("Reading...")
// rfid.read(function(err, result) {

//     if (err) {console.log("Some hardware error occured")};
//     console.log(results);

// });
rfid.readintime(5000, function (err, result) {
    if (err) console.log("Sorry, some hardware error occurred"); //some kind of hardware/wire error
    if (result == "timeout") {
        console.log("Sorry, You timed out"); //check if time exceeded the time you passed as argument and print timeout message
    } else {
        console.log(result); //print rfid tag UID
    }
});

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
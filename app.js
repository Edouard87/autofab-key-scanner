// Require modules

var fs = require("fs");
const ip = require("ip")
var {PythonShell} = require("python-shell");

// Require config

const config = require("./config.json")

const encrypt = require("socket.io-encrypt")
var socket = require('socket.io-client')(config.server_ip + ":" + config.server_port);
encrypt(config.secret)(socket)

console.log("System starting up...")

socket.on('connect', function () {
    console.log("Connected!")
    socket.emit("handshake", {text: config.text, ip: ip.address()})
    let options = {
        mode: 'text',
        pythonPath: config.python,
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: __dirname,
        args: ['value1', 'value2', 'value3']
    };

    let shell = new PythonShell('read.py', options);

    shell.on("message", message => {
        console.log("message is: " + message)
        socket.emit("scan", {
            id: message,
            ip: ip.address()
        })
    })
});

socket.on("readers_update", function() {

    socket.emit("readers_return", {
        machine: config.machine,
        ip: ip.address()
    });

});
socket.on("status", data => {

    console.log("Status: " + data.status)

    if (data.status == "usr_match") {

        console.log("The user was found. The user is " + data.user);

    }

    if (data.status == "authorized") {

        console.log("authorized")
        var sessionCheck = setInterval(function() {

            console.log("checking...")

            if (Math.floor(new Date().getTime() / 1000) >= data.end) {

                clearInterval(sessionCheck)
                console.log("session expired")

            }

        }, 100);
        // console.log(sessionCheck)

    } 

    if (data.status == "no_rez") {

        console.log("No resrevation was made for this time slot by you")
        console.log("test")
        console.log(data.machine)

    }

    if (data.status == "does_not_exist") {

        console.log("The machine does not exist. Please reconfigure this scanner and supply an assigned ID")

    }

});
socket.on("reader_change_machine", function(data) {

    console.log("changing...")
    console.log(data);

    if (ip.address() == data.destination) {

        fs.writeFileSync(__dirname + "/config.json", JSON.stringify({
            machine: data.new_machine,
            server_ip: config.server_ip,
            server_port: config.server_port
        }));
        config = JSON.parse(fs.readFileSync(__dirname + "/config.json", "utf-8"));

    }

})

socket.on("connect_error", function () {

    console.log("Unable to comnnect.")

})
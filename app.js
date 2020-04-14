// Require modules

var fs = require("fs");
const ip = require("ip")
var {PythonShell} = require("python-shell");

// Require config

const config = require("./config.json")

const Lcd = require('lcd');
var lcd;

if (!config.env.dev) {
    lcd = new Lcd({
        rs: 17,
        e: 14,
        data: [15, 18, 23, 24],
        cols: 16,
        rows: 2
    });
}

const encrypt = require("socket.io-encrypt")
var socket = require('socket.io-client')(config.server_ip + ":" + config.server_port);
encrypt(config.secret)(socket)

console.log("System starting up...")

let options = {
        mode: 'text',
        pythonPath: config.python,
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: __dirname,
        args: ['value1', 'value2', 'value3']
    };

socket.on('connect', function () {
    console.log("Connected!")
    socket.emit("handshake", {text: config.text, ip: ip.address()})

    if (config.env.dev) {
        socket.emit("scan", {
            id: config.env.rfid,
            ip: ip.address()
        })
    } else {
        let shell = new PythonShell('read.py', options);

        shell.on("message", message => {
            console.log("message is: " + message)
            socket.emit("scan", {
                id: message,
                ip: ip.address()
            })
        })
    }
});

var msg = "Starting up..."

socket.on("user", (data) => {
    console.log("User Is: ", data)
    msg = data.username
});

lcd.on('ready', _ => {
    setInterval(() => {
	lcd.clear()
        lcd.setCursor(0, 0);
        lcd.print(msg);
    },1000);
});

socket.on("connect_error", function () {

    console.log("Unable to comnnect.")

})

if (!config.env.dev) {
    process.on('SIGINT', _ => {
        lcd.close();
        process.exit();
    });
}

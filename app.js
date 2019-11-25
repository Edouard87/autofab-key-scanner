const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/user');

const express = require('express');
const app = express();
const server = require("http").Server(app);

const HID = require("node-hid");

// Connecting to the scanner

var devices = HID.devices();
console.log(devices);
var HIDpath;
for (var i = 0; i < devices.length; i++) {

    if (devices[i].product === 'IC Reader') {

        console.log("Found!")
        HIDpath = devices[i].path;
        HIDVID = devices[i].vendorId;
        HIDPID = devices[i].productId;
        break;

    }

}
console.log(HIDpath);
// var device = new HID.HID(HIDpath)
console.log(HIDPID)
console.log(HIDVID)
var device = new HID.HID(HIDpath)

var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function () { console.log("connected!") });
socket.on('data', function (data) { console.log(data) });
socket.emit("trigger", {rfid:"123hdidhf"});
socket.on('disconnect', function () { });

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

// console.log("Attempting to connect!")

// const socket = ioClient.connect("localhost:3000");
// socket.on("connect", function (sock) {

//     console.log("connected!")
//     sock.on("data", function(data) {

//         console.log(data)

//     });

// });

// io.on("connection", function(socket) {

//     socket.emit('news', {data:'name'});
//     socket.on("event", function(data) {

//         console.log("data")

//     })

// });

server.listen(30000);

// module.exports = app;

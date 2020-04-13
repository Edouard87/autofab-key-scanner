var {PythonShell} = require("python-shell");
const config = require("./config.json")

let options = {
    pythonPath: config.python,
    scriptPath: __dirname,
    args: ['value1', 'value2', 'value3']
};

let shell = new PythonShell('test.py', options);

shell.send("Please scan your fob");

shell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
});

shell.end(function (err) {
    if (err) {
        throw err;
    };
    console.log('finished');
});

// end the input stream and allow the process to exit

// shell.on("message", message => {
//     console.log("message is: " + message)
//     console.log("sending message!")
//     shell.send("test message")
// })


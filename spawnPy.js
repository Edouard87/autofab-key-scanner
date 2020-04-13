var {PythonShell} = require("python-shell");
const config = require("./config.json")

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
    // let lcdProcess = new PythonShell("test.py",options)
})


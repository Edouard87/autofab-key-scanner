var {PythonShell} = require("python-shell");

let options = {
    mode: 'text',
    pythonPath: '/usr/local/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: __dirname,
    args: ['value1', 'value2', 'value3']
};

let shell = new PythonShell('read.py', options);

shell.on("message", message => {
    console.log(message)
})


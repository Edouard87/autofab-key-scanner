const Lcd = require('lcd');
const lcd = new Lcd({
    rs: 17,
    e: 14,
    data: [15, 18, 23, 24],
    cols: 16,
    rows: 2
});

lcd.on('ready', _ => {
    setInterval(_ => {
        lcd.setCursor(0, 0);
        lcd.print(new Date().toISOString().substring(11, 19), err => {
            if (err) {
                throw err;
            }
        });
    }, 1000);
});

// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', _ => {
    lcd.close();
    process.exit();
});
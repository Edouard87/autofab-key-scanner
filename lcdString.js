const Lcd = require('lcd');
var lcd = new Lcd({
    rs: 17,
    e: 14,
    data: [15, 18, 23, 24],
    cols: 16,
    rows: 2
});

lcd.on('ready', _ => {
    lcd.setCursor(0, 0);
    lcd.print("CUNT");
});

process.on('SIGINT', _ => {
    lcd.close();
    process.exit();
});
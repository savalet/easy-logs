const fs = require('fs');
const path = require('path');

const LOG_DIRECTORY = path.join('logs');

if (!fs.existsSync(LOG_DIRECTORY)) {
    fs.mkdirSync(LOG_DIRECTORY);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function getLevelName(level) {
    switch (level) {
        case 0:
            return '\x1b[31mERROR\x1b[37m';
        case 1:
            return '\x1b[33mWARN\x1b[37m';
        case 2:
            return '\x1b[36mINFO\x1b[37m';
        case 3:
            return '\x1b[36mDEBUG\x1b[37m';
        default:
            return '\x1b[32mUNKNOWN\x1b[37m';
    }
}

function getFormattedMessage(level, message) {
    const date = new Date();
    const levelName = getLevelName(level);
    const formattedDate = formatDate(date);

    return `[\x1b[30m${formattedDate}\x1b[37m] (${levelName}) ${message}`;
}
function removeAnsiCodes(text) {
    const ansiEscape = /\x1b\[\d{1,3}m/g;
    return text.replace(ansiEscape, '');
}

function log(level, message) {
    const formattedMessage = getFormattedMessage(level, message);
    const formattedMessageInFile = removeAnsiCodes(formattedMessage);
    const filePath = path.join(LOG_DIRECTORY, `${formatDate(new Date()).substr(0, 10)}.log`);
    console.log(formattedMessage);
    fs.appendFileSync(filePath, formattedMessageInFile + '\n');
}

module.exports = {
    error: (message) => {
        log(0, message);
    },
    warn: (message) => {
        log(1, message);
    },
    info: (message) => {
        log(2, message);
    },
    debug: (message) => {
        log(3, message);
    },
};

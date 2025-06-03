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
            return 'ERROR';
        case 1:
            return 'WARN';
        case 2:
            return 'INFO';
        case 3:
            return 'DEBUG';
        default:
            return 'UNKNOWN';
    }
}

function getFormattedMessage(level, message) {
    const date = new Date();
    const levelName = getLevelName(level);
    const formattedDate = formatDate(date);

    return `[${formattedDate}] (${levelName}) ${message}`;
}

function log(level, message) {
    const formattedMessage = getFormattedMessage(level, message);
    const filePath = path.join(LOG_DIRECTORY, `${formatDate(new Date()).substr(0, 10)}.log`);
    console.log(formattedMessage);
    fs.appendFileSync(filePath, formattedMessage + '\n');
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

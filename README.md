# Easy Logs
Easy Logs is a simple logging module for Node.js that allows you to log messages to a file and/or to the console with customizable log levels. The logs are automatically rotated daily, with each day's logs being stored in a file named in the format "YYYY-MM-DD.log".

## Installation
To use Easy Logs in your Node.js project, you can install it via NPM:
```shell
npm i @savalet/easy-logs
```

## Usage
To use Easy Logs in your Node.js project, you first need to import it into your file:
```js
const logger = require('@savalet/easy-logs');
```

Then, you can use the logger object to log messages at different levels:
```js
logger.error('An error occurred');
logger.warn('A warning occurred');
logger.info('An informational message');
logger.debug('A debug message');
```

## Configuration

The logger can be configured by setting the following environment variables:

    LOG_DIRECTORY: The directory where log files should be stored. Defaults to ./logs.

## License

Easy Logs is released under the MIT License. See LICENSE file for details.
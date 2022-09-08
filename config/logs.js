const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
    ),
    transports: [
        // Log errors to console
        new transports.Console({
            name: 'error-console',
            level: 'error',
            handleExceptions: true
        })
    ]
});

// Overwrite some built-in console functions
console.error = (...args) => logger.error(...args);
console.log = (...args) => logger.info(...args);
console.info = (...args) => logger.info(...args);
console.debug = (...args) => logger.debug(...args);
console.warn = (...args) => logger.warn(...args);
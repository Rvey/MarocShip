const {
    createLogger,
    format,
    transports

} = require('winston');
const dayjs = require('dayjs');
require('winston-mongodb');
const logger = createLogger({
    transports : [
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(), format.simple()) ,
        }),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'logs/combined.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.simple()) ,
        })

    ]
});

module.exports = logger;
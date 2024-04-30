const { format } =  require('date-fns');
//here we are saying import v4 as uuid
const { v4: uuid } = require('uuid')

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

async function logEvents(message, logName) {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        //test logItem
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next(); //moves on tot eh next function which has a built in next() call
}

module.exports = { logger, logEvents };
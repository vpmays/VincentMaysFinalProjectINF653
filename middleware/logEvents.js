// in console, 'npm install nodemon -g'
// nodemon will automatically restart the server for you when you save a file
//console.log('testing!')


// in consle, 'npm init -y' to initialize npm for the project and accept 
// all default setting. Leave out -y if you want to change defaults
// this creates package.json file which saves all the setting for your package. 
// this file stays with github repository and prevents you from having to trsnfer the packages themeselves
// this save on data transfer because you can just install the needed packages when you pull down
// the project.

// in console, add a package to the program 'npm install date-fns'
// this installs the package as a dependecy and should show up in your package.json file
// this should also create a package-lock.json file and a node_modules folder with files inside
// make .gitignore file and enter this node_modules into it because you don't want all these data
// uploaded to github.
// Additionally, you want to elete the node_midlues folder when pulling down another repo. Instead,
// once you pull down the repo, run 'npminstall' in the console and that will install all your
// needed modules.

const { format } =  require('date-fns');
//try out uuid
//here we are saying import v4 as uuid
const { v4: uuid } = require('uuid')

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

async function logEvents(message, logName) {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    //console.log(logItem);
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

//console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss')); //read docs to figure out how to format this

//in console, save nodemon as a dev dependencies with 'npm install nodemon -D'

//demonstrate nodemon is working
//console.log('hello')

//test uuid
//console.log(uuid());
//show that uuid id will generate a new id for each change
//console.log('test');


// const whhitelist = [
//     'hhtps://www.yoursite.com', 
//     'http://127.0.0.1:5500', 
//     'http://localhost:3500'
// ];

// const corsOptions = {
//     //second origin is the origin coming from whoever called it
//     origin: (origin, callback) => {
//         //the || !origin is for development to allow undefined access
//         if (whhitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     optionsSuccessStatus: 200
// }

const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
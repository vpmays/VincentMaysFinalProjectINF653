require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const app = express();
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
// const verifyJWT = require('./middleware/verifyJWT');
// const cookieParser = require('cookie-parser');
// const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

//create port, needs to be local port OR use process.env.PORT' for when hosting
const PORT = process.env.PORT || 3500;

//connect to mongoDB
connectDB();

//middle where is technically any code that exicutes between req and res
//All these middleware pices will be applied to all routes because of the waterfall 
// nature of express

//custome middleware for logging requests
// built in middleware does not need 'next' in parameters because it's already built in,
// we have to enter it manually
app.use(logger);

//apply cors to handle cross origin resource sharing to allow third party to access our site
//create list of cites that can access your backend server

app.use(cors(corsOptions));


//this is some built in middleware to handles urlencoded data
//in other words, form data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built in mioddleware for json data
app.use(express.json());

//middleware for cookies
//app.use(cookieParser());

//seve static files
// will search the public directory for these files before it moves to other routes,
// meaning it will disoplay them properly in the broweser on the webpage
app.use('/', express.static(path.join(__dirname, '/public')));

//routes 
app.use('/', require('./routes/root'));

//app.use('/register', require('./routes/register'));
// app.use('/auth', require('./routes/auth'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));
// app.use(verifyJWT);

// app.use('/employees', require('./routes/api/employees'));
app.use('/states', require('./routes/api/states'));

// //example of a route handler (these are all route handlers but this does more stuff with next)
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('Attempted to load hello.html');
//     next(); //next() tells epress to call the next function in the chaing, this can continue as mucha s you want
//     }, (req, res) => {
//         res.send('Hello world!');
//     });

// //another example of chaining funciton with next()
// const one = (req,res,next) => {
//     console.log('one');
//     next();
// }
// const two = (req,res,next) => {
//     console.log('two');
//     next();
// }
// const three = (req,res) => {
//     console.log('three');
//     res.send('Finished the chain!');
// }
// //then call all these function in a route by feeding the .get() and array
// app.get('/chain(.html)?', [one, two, three]);

// //respond to get request on any page that you don't have and send to 404 (need to specify 404 siince we actually do have 404.html)
// // this works because epress treats these routes as a waterfall
// // can use use.all instead of get to catch anything that made it this far down the waterfall
// // .all responds to all request types

app.all('*', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.status(404);
    //check which file type was requested
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 not found"});
    } else {
        res.type('txt').send("404 not found");
    }
});

app.use(errorHandler);

// at the end of the server file we always need a server (app) listen command
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); 
});
const port = 3080

const express = require('express');
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
// let session = require('express-session')
global.__basedir = __dirname;

const User = require('./routes/User.Route')
const Utils = require('./routes/Utils.Route')
// const Upload = require("./routes/Upload.Route");
const Source = require("./routes/Source.Route");

// using express session
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     resave: false,
//     cookie: {
//         httpOnly:true,
//         maxAge:1000 * 60 * 60 * 24
//     }
// }))

let jsonParser = bodyParser.json()
let bodyUrlEncode = bodyParser.urlencoded({ 
    extended: true,
})

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(jsonParser)
app.use(bodyUrlEncode);

app.use('/user', User);
app.use('/utils', Utils);
app.use('/source', Source);
//app.use('/upload', Upload)

app.listen(port, ()=> {
    console.log(`Serve listening at http://0.0.0.0:${port}`)
})
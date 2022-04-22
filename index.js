const express = require('express');
const port = 3080
const app = express()
var cors = require('cors')
// let session = require('express-session')
global.__basedir = __dirname;

const User = require('./routes/User.Route')
const Utils = require('./routes/Utils.Route')
const Upload = require("./routes/Upload.Route");

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
app.use(cors())
app.use(express.urlencoded({ extended: true }));
Upload(app);

app.use('/user', User);
app.use('/utils', Utils);
//app.use('/upload', Upload)

app.listen(port, ()=> {
    console.log(`Serve listening at http://0.0.0.0:${port}`)
})
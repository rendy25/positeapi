const express = require('express');
const app = express()
var cors = require('cors')
var path = require('path');
const bodyParser = require('body-parser')
var fs = require('fs');
// let session = require('express-session')
global.__basedir = __dirname;

const User = require('./routes/User.Route')
const Utils = require('./routes/Utils.Route')
// const Upload = require("./routes/Upload.Route");
const Source = require("./routes/Source.Route");

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

app.get("/uploads/:name", (req, res) => {
    res.sendFile(path.join(__basedir, "./assets/uploads/"+req.params.name));
});

app.get("/code/:name", (req, res) => {
    fs.readFile(__basedir + "/assets/uploads/"+ req.params.name, "utf8", function (error, html){
        if (error) {
            throw error;
        }
        
        res.writeHead(200, {
            "Content-type": "text/html"
        });

        res.end(html.replace("{ user }", "Node JS"));
    });
});

app.listen(process.env.APP_PORT, ()=> {
    console.log(`Serve listening at http://0.0.0.0:${process.env.APP_PORT}`)
})
const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const resResult = require('../utils/Response.Utils');
const { generateTokenApp } = require('../utils/Token');
var jsonParser = bodyParser.json()


router.get('/tokenApp', jsonParser, async(req, res, next) => {
    try {
        const token = {token:generateTokenApp()}
        resResult(200, token, res)
    } catch(err) {
        next(err)
    }
})

module.exports = router
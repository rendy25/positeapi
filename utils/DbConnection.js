const knex = require('knex');
const config = require('../knexfile');
const node = process.env.DB_NAME

const db = knex( config.development);

module.exports = db
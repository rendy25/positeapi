const db = require('../utils/DbConnection')

const getUser = (callback) => {
    // with callback function

    // db.from('user')
    // .select('*')
    // .then(e => {
    //     callback(e)
    // })

    return db.from('t_users')
    .select('*')
}

const createUserM = (data) => {
    //const test = db('try_users').insert({username:data.username, password:data.password})
    //console.log(test)
    return db('t_users').insert({email:data.email, firstname:data.firstname, lastname:data.lastname,
        levelid:data.levelid, password:data.password, imageurl:data.imageurl, statusid:data.statusid})
}

const getDataLimitFromTable = (data, tableName, limit) => {
    return db(tableName)
    .where(data)
    .limit(limit)
}

module.exports = {getUser, createUserM, getDataLimitFromTable}
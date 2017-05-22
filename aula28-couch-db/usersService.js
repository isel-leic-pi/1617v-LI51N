'use strict'

const fs = require('fs')
const httpReq = require('request')

const FOOTBALL_DB = 'http://127.0.0.1:5984/football/'

module.exports = {
    'find': find,
    'authenticate': authenticate,
    'save': save
}

function find(username, cb) {
    const path = FOOTBALL_DB + username
    httpReq(path, (err, resp, body) => {
        if(err) return cb(err)
        if(resp.statusCode != 200) return cb(err, null)
        cb(null, JSON.parse(body))
    })
}
/**
 * @param String username 
 * @param String passwd 
 * @param Function cb callback (err, user, info) => void. If user exists
 * but credentials fail then calls cb with undefined user and an info message.
 */
function authenticate(username, passwd, cb) {
    find(username, (err, user) => {
        if(err) cb(err)
        if(!user) return cb(null, null, 'User does not exists')
        if(passwd != user.password) return cb(null, null, 'Invalid password')
        cb(null, user)
    })
}

function save() {
    fs.writeFile('./data/usersDb.json', JSON.stringify(dbUsers))
}
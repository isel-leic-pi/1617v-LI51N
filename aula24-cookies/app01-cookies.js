'use strict'

const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
/**
 * Setup express
 */
const app = express()
app.use(cookieParser())
app.use((req, resp, next) => {
    for(let p in req.cookies)
        console.log(p + ' = ' + req.cookies[p])
    next()
})
app.use((req, resp) => {
    // <=> resp.setHeader('Set-Cookie', 'author=Miguel')
    resp.cookie('author', 'Fernando', {expires: new Date(Date.now() + 900000)})
    resp.cookie('location', 'Lisbon', {expires: new Date(Date.now() + 900000)})
    resp.cookie('author', 'Miguel', {expires: new Date(Date.now() + 900000)})
    resp.end()
})
/**
 * Launch server
 */
const server = http.createServer(app)
server.listen(3000)
console.log('Listening on port 3000...')
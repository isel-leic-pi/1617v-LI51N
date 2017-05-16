'use strict'

const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
/**
 * Setup express
 */
const app = express()
app.use(cookieParser())
app.use(session({ secret: 'keyboard cat', resave: false,saveUninitialized: true}))
app.use(flash())
app.use((req, res, next) => {
    console.log('#####################')
    for(let p in req.session)
        console.log(p + ' = ' + req.session[p])
    console.log('dummy = ' + req.flash('dummy'))
    next()

})
app.get('/dummy', (req, res) => {
    req.flash('dummy', 'stuff')
    res.redirect('/')
})
app.use((req, res) => {
    req.session.author = 'Carlos'
    req.session.location = 'Porto'
    res.end()
})

/**
 * Launch server
 */
const server = http.createServer(app)
server.listen(3000)
console.log('Listening on port 3000...')
'use strict'
/**
 * Import npm packages
 */
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const passport = require('passport')
const session = require('express-session')
/**
 * Import local packages
 */
const footballCtr = require('./controller/footballController')
const buildRoutes = require('./util/build-routes')
const usersService = require('./usersService.js')
const app = express()
/**
 * Setup web app
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
hbs.localsAsTemplateData(app)
/**
 * Setup passport
 */
passport.use('basic', {
    authenticate: function(req) {
        console.log('Authenticating...')
        usersService.authenticate(req.body.username, req.body.password, (err, user, info) => {
            if(err) return this.error(err)
            if(!user) return this.fail(info)
            this.success(user) // => redirect + gravar no Cookie o user
        })
    }
})
passport.serializeUser(function(user, cb) {
    cb(null, user.username)
})

passport.deserializeUser(function(username, cb) {
    usersService.find(username, cb)
})
/**
 * Middlewares
 */
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session()) // Obtem da sessão user id -> deserialize(id) -> user -> req.user
app.use((req, res, next) => { 
    res.locals.user = req.user; next() 
})
/**
 * Routes
 */
app.use('/football', buildRoutes(footballCtr))
app.post('/login', passport.authenticate('basic', {
    successRedirect: '/football/leagues',
    failureRedirect: '/login'
}))
app.get('/login', (req, res) => res.render('login'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

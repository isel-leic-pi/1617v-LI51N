const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs')
const footballCtr = require('./controller/footballController')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
addFootbalRoutes(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * Adds a route for each method of footballCtr object.
 */
function addFootbalRoutes(app) {
    for (let endpoint in footballCtr) {
        const action = footballCtr[endpoint]
        app.get('/football/' + endpoint, (req, res, next) => {
            /**
             * 1. Call action with query-string arguments
             * 2. Representação: Obter uma String com a representação HTML do recurso.
             * 3. Envio da resposta: statusCode 200 + send() + end()
             */
            action(req.query, (err, data) => {
                if(err) return next(err)
                res.render(endpoint, data)
            })
        })
    }
}

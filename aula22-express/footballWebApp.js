const http = require('http')
const express = require('express')
const serveStatic = require('serve-static')
const footballCtr = require('./controller/footballController')
const hbs = require('hbs')

const port = process.argv[2] | 3000
const app = express()
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

/**
 * Build connect Middlewares stack
 */
app.use(serveStatic('public'))
addFootbalRoutes(app)
app.use((req, resp) => sendResponse(resp, 404, 'Resource not Found'))
app.use((err, req, resp, next) => sendResponse(resp, 500, err.message))

/**
 * Init HTTP server
 */
const server = http.createServer(app)
server.listen(port)
console.log('Listening on port ' + port)

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

function sendResponse(resp, status, msg) {
    resp.statusCode = status
    resp.write(msg)
    resp.end()
}

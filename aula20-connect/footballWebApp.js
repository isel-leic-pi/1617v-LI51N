const http = require('http')
const connect = require('connect')
const url = require('url')
const fs = require('fs')
const footballCtr = require('./controller/footballController')

const port = process.argv[2] | 3000
const app = connect()

/**
 * Build connect Middlewares stack
 */
app.use(parsePath)
app.use(readCss)
app.use(footballAction)
app.use((req, resp) => sendResponse(resp, 404, 'Resource not Found'))
app.use((err, req, resp, next) => sendResponse(resp, 500, err.message))

/**
 * Init HTTP server
 */
const server = http.createServer(app)
server.listen(port)
console.log('Listening on port ' + port)


function parsePath(req, resp, next) {
    const urlObj = url.parse(req.url, true)
    req.pathname = urlObj.pathname
    req.query = urlObj.query
    next()
}

function readCss(req, resp, next) {
    if(req.pathname.indexOf('.css') > 0) {
        const file = req.pathname.substring(10)
        fs.readFile(file, (err, data) => {
            if(err) next(err)
            else sendResponse(resp, 200, data.toString())
        })
    } else {
        next()
    }
}

function footballAction(req, resp, next) {
    const parts = req.pathname.split('/')
    const endpoint = parts[2]
    let action = footballCtr[endpoint]
    if(action == undefined || parts[1] != 'football') {
        return next()
    } else {
        /**
         * 1. Call action with query-string arguments
         * 2. Representação: Obter uma String com a representação JSON do recurso.
         * 3. Envio da resposta: statusCode 200 + send() + end()
         */
        action(req.query, (err, data) => {
            if(err) return next(err)
            resp.writeHead(200, { 'Content-Type': 'text/html' })
            resp.end(data)
        })
    }
}

function sendResponse(resp, status, msg) {
    resp.statusCode = status
    resp.write(msg)
    resp.end()
}

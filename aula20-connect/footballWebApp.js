const http = require('http')
const connect = require('connect')
const url = require('url')
const fs = require('fs')
const footballCtr = require('./controller/footballController')

const port = process.argv[2] | 3000


/**
 * Init HTTP server
 */
const server = http.createServer(httpServerListener)
server.listen(port)
console.log('Listening on port ' + port)

function readCss(path, resp) {
    const file = path.substring(10)
    fs.readFile(file, (err, data) => {
        if(err)  return sendResponse(resp, 500, err.message)
        sendResponse(resp, 200, data.toString())
    })
}

function sendResponse(resp, status, msg) {
    resp.statusCode = status
    resp.write(msg)
    resp.end()
}

/**
 * Routing
 */
function httpServerListener(req, resp) {
    const urlObj = url.parse(req.url, true)
    if(urlObj.pathname.indexOf('.css') > 0) {
        return readCss(urlObj.pathname, resp)
    }
    const parts = urlObj.pathname.split('/')
    const endpoint = parts[2]
    let action = footballCtr[endpoint]
    if(action == undefined || parts[1] != 'football') {
        sendResponse(resp, 404, 'Resource not Found')
    } else {
        /**
         * 1. Call action with query-string arguments
         * 2. Representação: Obter uma String com a representação JSON do recurso.
         * 3. Envio da resposta: statusCode 200 + send() + end()
         */
        action(urlObj.query, (err, data) => {
            if(err) sendResponse(resp, 500, err.message)
            resp.writeHead(200, { 'Content-Type': 'text/html' })
            resp.end(data)
        })
    }
}


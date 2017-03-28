const http = require('http')
const url = require('url')
const football = require('./footballService')

const port = process.argv[2] | 3000


/**
 * Init HTTP server
 */
const server = http.createServer(httpServerListener)
server.listen(port)
console.log('Listening on port ' + port)

function httpServerListener(req, resp) {
    const urlObj = url.parse(req.url, true)
    const parts = urlObj.pathname.split('/')
    const endpoint = parts[2]
    let action = football[endpoint]
    if(action == undefined || parts[1] != 'football') {
        sendResponse(404)
    } else {
        /**
         * 1. Call action
         * 2. Representação: Obter uma String com a representação JSON do recurso.
         * 3. Envio da resposta: statusCode 200 + send() + end()
         */
        action((err, obj) => {
            if(err) sendResponse(500, err.message)
            const data = JSON.stringify(obj)
            resp.writeHead(200, { 'Content-Type': 'application/json' })
            resp.end(data)
        })
    }

    function sendResponse(status, msg) {
        resp.statusCode = status
        resp.write(msg)
        resp.end()
    }
}


const http = require('http')
const url = require('url')
const football = require('./footballService')

const port = process.argv[2] | 3000


/**
 * Init HTTP server
 */
const server = http.createServer(callback)
server.listen(port)
console.log('Listening on port ' + port)

function callback(req, resp) {
    const urlObj = url.parse(req.url, true)
    const parts = urlObj.pathname.split('/')
    const endpoint = parts[2]
    let action = football[endpoint]
    if(action == undefined || parts[1] != 'football') {
        resp.statusCode = 404
        resp.end()
    } else {
        /**
         * 1. Call action
         * 2. Representação: Obter uma String com a representação JSON do recurso.
         * 3. Envio da resposta: statusCode 200 + send() + end()
         */
        const obj = action(urlObj.query.iso)
        const data = JSON.stringify(obj)
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(data)
    }
}


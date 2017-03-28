const http = require('http')
const url = require('url')
const timeService = require('./timeService')

const port = process.argv[2]


/**
 * Init HTTP server
 */
const server = http.createServer(callback)
server.listen(port)


function callback(req, resp) {
    const urlObj = url.parse(req.url, true)
    const endpoint = urlObj.pathname.split('/')[2]
    let action = timeService[endpoint]
    if(action != undefined) {
        /**
         * 1. Call action
         * 2. Representação: Obter uma String com a representação JSON do recurso.
         * 3. Envio da resposta: statusCode 200 + send() + end()
         */
        const obj = action(urlObj.query.iso)
        const data = JSON.stringify(obj)
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(data)
    } else {
        resp.statusCode = 404
        resp.end()
    }
}


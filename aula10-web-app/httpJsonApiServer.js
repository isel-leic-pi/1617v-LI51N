const http = require('http')
const url = require('url')
const timeService = require('./timeService')

const port = process.argv[2]


/**
 * Init HTTP server
 */
const server = http.createServer(callback)
server.listen(port)

/**
 * Endpoints paths
 */
const parseTime = '/api/parsetime'
const unixTime = '/api/unixtime'
const dateTime = '/api/datetime'

function callback(req, resp) {
    const urlObj = url.parse(req.url, true)
    let action
    if (urlObj.pathname == parseTime) {
        action = timeService.parseTime
    }
    else if (urlObj.pathname == unixTime) {
        action = timeService.unixTime
    }
    else if (urlObj.pathname == dateTime) {
        action = timeService.dateTime
    }
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


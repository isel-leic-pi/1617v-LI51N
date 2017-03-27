const http = require('http')
const url = require('url')

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


function callback(req, resp) {
    const urlObj = url.parse(req.url, true)

    if (urlObj.pathname == parseTime) {
        /**
         * 1. Criar o objecto Date correspondente ao iso recebido
         * 2. Recurso: Criar o objecto de Domínio que representa o resultado deste Endpoint
         * 3. Representação: Obter uma String com a representação JSON do recurso.
         * 4. Envio da resposta: statusCode 200 + send() + end()
         */
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify(new ParseTime(new Date(urlObj.query.iso))))
    }
    else if (urlObj.pathname == unixTime) {
        /**
         * 1. Criar o objecto Date correspondente ao iso recebido
         * 2. Recurso: Criar o objecto de Domínio que representa o resultado deste Endpoint
         * 3. Representação: Obter uma String com a representação JSON do recurso.
         * 4. Envio da resposta: statusCode 200 + send() + end()
         */
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify(new UnixTime(new Date(urlObj.query.iso))))
    }
    else {
        resp.statusCode = 404
        resp.end()
    }
}

function ParseTime(date) {
    this.hour = date.getHours()
    this.minute = date.getMinutes()
    this.second = date.getSeconds()
}

function UnixTime(date) {
    this.unixtime = date.getTime()
}
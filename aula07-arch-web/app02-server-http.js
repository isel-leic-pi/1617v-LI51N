const http = require('http')
const strftime = require('strftime')

function parseTime(dt, time) {
    const data = `
        <h1>GMT Time</h1>
        <ul>
            <li><strong>Date</strong>: ${dt}</li>
            <li><strong>Time</strong>: ${time}</li>
        </ul>
    `
    return data
}

const server = http.createServer((req, resp) => {
    for(let header in req.headers) {
        console.log(header + ': ' + req.headers[header])
    }
    const now = new Date()
    const dt = parseTime(strftime('%F', now), strftime('%T', now))
    resp.write(dt)

    // resp.writeHeader(200, {'Content-Type': 'application/json'})
    // resp.write(JSON.stringify(now))
    resp.end()
})
server.listen(3000)
console.log('Listening on port 3000')
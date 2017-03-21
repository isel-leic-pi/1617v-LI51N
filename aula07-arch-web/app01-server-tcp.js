const net = require('net')
const strftime = require('strftime')

const server = net.createServer(socket => {
    const now = new Date()
    const dt = strftime('%F %T', now)
    socket.write(dt)
    socket.end()
})
server.listen(3000)
console.log('Listening on port 3000')
'use strict'

const fs = require('fs')

module.exports = function(uri, cb) {
    const parts = uri.split('/')
    const endpoint = 
        parts[parts.length - 2].replace('[,=?&]', '-')
        + '-' 
        + parts[parts.length - 1].replace('[,=?&]', '-')
    const path = __dirname + '/' + endpoint + '.json'
    fs.readFile(path, (err, data) => {
        if(err) return cb(err)
        cb(null, null, data.toString())
    })
}

'use strict'

const football = require('./../footballService')

module.exports.testGetLeagues = function(test) {

    football.getLeagues((err, arrLeagues) => {
        test.equal(arrLeagues[1].caption, 'Premier League 2016/17')
        test.done()
    })
}


'use strict'

const req = require('./requestFile')
const football = require('./../footballService')(req)

module.exports.testGetLeagues = function(test) {
    football.getLeagues((err, arrLeagues) => {
        if(err) return failure(err, test)
        test.equal(arrLeagues[1].caption, 'Premier League 2016/17')
        test.done()
    })
}

module.exports.testGetLeagueTable = function(test) {
    football.getLeagueTable(426, (err, leagueTable) => {
        if(err) return failure(err, test)
        test.equal(leagueTable.caption, 'Premier League 2016/17')
        test.equal(leagueTable.teams[0].name, 'Chelsea FC')
        test.equal(leagueTable.teams.length, 20)
        test.done()
    })
}

function failure(err, test) {
    console.log(err.message)
    test.ok(false)
    test.done()
}

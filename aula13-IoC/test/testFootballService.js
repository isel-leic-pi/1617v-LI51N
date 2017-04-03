'use strict'

const football = require('./../footballService')

module.exports.testGetLeagues = function(test) {

    football.getLeagues((err, arrLeagues) => {
        test.equal(arrLeagues[1].caption, 'Premier League 2016/17')
        test.done()
    })
}

module.exports.testGetLeagueTable = function(test) {

    football.getLeagueTable(426, (err, leagueTable) => {
        test.equal(leagueTable.caption, 'Premier League 2016/17')
        test.equal(leagueTable.teams[0].name, 'Chelsea FC')
        test.equal(leagueTable.teams.length, 20)
        test.done()
    })
}


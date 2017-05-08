'use strict'

const football = require('./../footballService')

module.exports = {
    leagues,
    leagueTable
}

function leagues(query, cb) {
    football.getLeagues((err, leagues) => {
        if(err) cb(err)
        leagues.title = 'Leagues'
        cb(null, leagues)
    })
}

function leagueTable(query, cb) {
    if(!query.id) return cb(new Error('Id not found'))
    football.getLeagueTable(query.id, (err, leagueTable) => {
        if(err) return cb(err)
        leagueTable.title = 'League Table'
        cb(null,leagueTable)
    })
}
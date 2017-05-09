'use strict'

const football = require('./../footballService')

module.exports = {
    leagues,
    getLeagueTable,
    postDummy
}

function leagues(req, cb) {
    football.getLeagues((err, leagues) => {
        if(err) cb(err)
        leagues.title = 'Leagues'
        cb(null, leagues)
    })
}

function getLeagueTable(req, res, next) {
    if(!req.query.id) return next(new Error('Id not found'))
    football.getLeagueTable(req.query.id, (err, leagueTable) => {
        if(err) return next(err)
        leagueTable.title = 'League Table'
        res.render('leagueTable', leagueTable)
    })
}

function postDummy(req, res) {
    res.send(200)
}
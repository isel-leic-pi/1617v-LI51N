'use strict'

const util = require('util')
const football = require('./../footballService')
const fs = require('fs')

module.exports = {
    leagues,
    leagueTable
}

let leaguesView = fs.readFileSync('./views/leagues.txt').toString()
const leagueRow = fs.readFileSync('./views/leagueRow.txt').toString()

function leagues(query, cb) {
    football.getLeagues((err, leagues) => {
        if(err) cb(err)

        /*
        const tableContent = leagues
            .map(l => util.format(leagueRow, l.league, l.caption, l.year))
            .join('')
            */
        const tableContent = leagues
            .reduce((prev, l) => prev + util.format(leagueRow, l.league, l.caption, l.year), '')
        cb(null, util.format(leaguesView, tableContent))
    })
}

function leagueTable(query, cb) {

    
}


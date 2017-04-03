'use strict'

const util = require('util')
const football = require('./../footballService')
const fs = require('fs')

module.exports = {
    leagues,
    leagueTable
}

const leaguesView = fs.readFileSync('./views/leagues.txt').toString()
const leagueRow = fs.readFileSync('./views/leagueRow.txt').toString()
const leagueTableView = fs.readFileSync('./views/leagueTable.txt').toString()
const leagueTableRow = fs.readFileSync('./views/leagueTableRow.txt').toString()

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
    if(!query.id) return cb(new Error('Id not found'))

    football.getLeagueTable(query.id, (err, leagueTable) => {
        if(err) return cb(err)
        const tableContent = leagueTable.teams.reduce((prev, t) => prev + fillTableRow(t), '')
        const tableView = util.format(leagueTableView, leagueTable.id, leagueTable.caption, tableContent)
        cb(null, tableView)
    })
}

function fillTableRow(team) {
    return util.format(
        leagueTableRow, 
        team.urlTeam, 
        team.id,
        team.name,
        team.position,
        team.points,
        team.goals)
}
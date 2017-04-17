'use strict'

const football = require('./../footballService')
const fs = require('fs')
const handlebars = require('handlebars')
const util = require('util')

module.exports = {
    leagues,
    leagueTable
}

const leaguesView = handlebars.compile(
    fs.readFileSync('./views/leagues.hbs').toString())
const leagueTableView = handlebars.compile(
    fs.readFileSync('./views/leagueTable.hbs').toString())

handlebars.registerHelper('linkForLeague', linkForLeague)

function linkForLeague(id, caption){
    return  util.format(
        '<a href="leagueTable?id=%s">%s</a>', 
        id,
        caption)
}

function leagues(query, cb) {
    football.getLeagues((err, leagues) => {
        if(err) cb(err)
        cb(null, leaguesView(leagues))
    })
}

function leagueTable(query, cb) {
    if(!query.id) return cb(new Error('Id not found'))
    football.getLeagueTable(query.id, (err, leagueTable) => {
        if(err) return cb(err)
        cb(null, leagueTableView(leagueTable))
    })
}
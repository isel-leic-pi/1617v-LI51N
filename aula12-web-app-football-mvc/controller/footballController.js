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
        let tableContent = ''
        for(let i = 0; i < leagues.length; i++) {
            tableContent += util.format(leagueRow, leagues[i].league, leagues[i].caption, leagues[i].year);
        }
        cb(null, util.format(leaguesView, tableContent))
    })
}

function leagueTable(query, cb) {

    
}


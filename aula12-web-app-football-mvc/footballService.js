'use strict'

const req = require('request')
const League = require('./model/League')

const FOOTBALL_HOST = 'http://api.football-data.org/v1/'

module.exports = {
    getLeagues,
    getLeagueTable
}
function getLeagues(cb) {
    const path = FOOTBALL_HOST + 'soccerseasons'
    req(path, (err, resp, body) => {
        if(err) cb(err)
        const data = JSON.parse(body.toString())
        const leaguesArray = []
        for(let i = 0; i < data.length; i++)
            leaguesArray[i] = new League(data[i])
        cb(null, leaguesArray) // Na ausencia de erro o 1º arg é null
    })

}

function getLeagueTable(id, cb) {
    
}
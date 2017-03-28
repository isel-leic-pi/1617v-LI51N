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
        // const leaguesArray = []
        // data.forEach(obj => leaguesArray.push(new League(obj)))
        const leaguesArray = data.map(obj => new League(obj))
        cb(null, leaguesArray) // Na ausencia de erro o 1º arg é null
    })

}

function getLeagueTable(id, cb) {
    
}
'use strict'

const httpReq = require('request')
const League = require('./model/League')
const LeagueTable = require('./model/LeagueTable.js')

const FOOTBALL_HOST = 'http://api.football-data.org/v1/'

module.exports =  buildFootballService(httpReq)

function buildFootballService(req) {
    const obj  = function(req) {
        return buildFootballService(req)
    }

    obj.getLeagues = function(cb) {
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
    obj.getLeagueTable = function(id, cb) {
        const path = FOOTBALL_HOST +'competitions/'+ id + '/leagueTable'
        req(path, (err, resp, body) => {
            if(err) return cb(err)
            const data = JSON.parse(body.toString())
            cb(null, new LeagueTable(id,data)) 
        })
    }
    return obj
}

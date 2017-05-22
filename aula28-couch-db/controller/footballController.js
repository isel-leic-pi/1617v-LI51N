'use strict'

const football = require('./../footballService')
const League = require('./../model/League')

module.exports = {
    leagues,
    getLeaguesTableId,
    favourites,
    postAddFavourite
}

function leagues(cb) {
    football.getLeagues((err, leagues) => {
        if(err) cb(err)
        const ctx = {
            title: 'Leagues',
            showAddFavourites: true,
            leagues
        }
        cb(null, ctx)
    })
}

function getLeaguesTableId(id, cb) {
    if(!id) return cb(new Error('Id not found'))
    football.getLeagueTable(id, (err, leagueTable) => {
        if(err) return cb(err)
        leagueTable.title = 'League Table'
        cb(null, leagueTable)
    })
}

const favouritesList = {
    leagues: [],
    title: 'Favourites'
} 

function favourites(req, res) {
    res.render('leagues', favouritesList)
}

function postAddFavourite(req, res, next) {
    if(!req.body.id) next(new Error('Missing id on body!!s'))
    favouritesList.leagues.push(new League(req.body))
    res.redirect('/football/favourites')
}
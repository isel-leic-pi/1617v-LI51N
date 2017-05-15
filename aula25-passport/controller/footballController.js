'use strict'

const football = require('./../footballService')
const League = require('./../model/League')

module.exports = {
    leagues,
    getLeagueTable,
    favourites,
    postAddFavourite
}

function leagues(req, cb) {
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

function getLeagueTable(req, res, next) {
    if(!req.query.id) return next(new Error('Id not found'))
    football.getLeagueTable(req.query.id, (err, leagueTable) => {
        if(err) return next(err)
        leagueTable.title = 'League Table'
        res.render('leagueTable', leagueTable)
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
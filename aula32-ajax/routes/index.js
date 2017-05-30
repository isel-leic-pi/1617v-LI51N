const express = require('express')
const router = express.Router()
let seed = rand(10)
const fs = require('fs')
const hbs = require('hbs')
const viewGuessResult = hbs.compile(fs
  .readFileSync('public/partials/guessResult.hbs')
  .toString())

function rand(max) {
    return Math.floor(Math.random()*max)
}

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' })
})

router.get('/guess/:nr', function(req, res) {
    const nr = req.params.nr
    let ctx
    if(seed == nr) {
        ctx = {
            alertType: 'alert-success',
            alertMsg: 'Congrats you guess the number ' + nr
        }
        seed = rand(10)
    }
    else if(seed < nr) 
        ctx = {
            alertType: 'alert-warning',
            alertMsg: 'Your number is greater than seed!'
        }
    else 
        ctx = {
            alertType: 'alert-warning',
            alertMsg: 'Your number is lower than seed!'
        }
    res.send(200, viewGuessResult(ctx))
})

module.exports = router

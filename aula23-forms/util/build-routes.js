'use strict'

const paramsNames = require('get-parameter-names')
const express = require('express')
const HTTP_METHODS = ['get', 'post', 'delete', 'put']

module.exports = buildRoutes

/**
 * Adds a route for each method of footballCtr object.
 */
function buildRoutes(controller) {
    const router = new express.Router()
    for (let endpoint in controller) {
        const action = controller[endpoint]
        let v = getVerbForAction(endpoint)
        if(endpoint.startsWith(v)) endpoint = endpoint.substring(v.length)
        router[v]('/' + endpoint, buildMwForAction(action, endpoint))
    }
    return router
}

function getVerbForAction(endpoint) {
    const verbs = HTTP_METHODS
        .filter(verb => endpoint.startsWith(verb))
    return verbs.length != 0
        ? verbs[0]
        : 'get'
}

function buildMwForAction(action, endpoint) {
    if(paramsNames(action).includes('res'))
        return (req, res, next) => action(req, res, next)
    return (req, res, next) => {
        /**
         * 1. Call action with query-string arguments
         * 2. Representação: Obter uma String com a representação HTML do recurso.
         * 3. Envio da resposta: statusCode 200 + send() + end()
         */
        action(req, (err, data) => {
            if(err) return next(err)
            res.render(endpoint, data)
        })
    }    
}

'use strict'

module.exports = Team

// http://api.football-data.org/v1/competitions/425/leagueTable

function Team(obj) { 
    const path = obj._links.team.href.split('/')
    
    this.id =  path[path.length - 1]
    this.urlTeam =obj._links.team.href
    this.position = obj.position
    this.name = obj.teamName
    this.points = obj.points
    this.goals = obj.goals
}

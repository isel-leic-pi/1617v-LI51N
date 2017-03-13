'use strict'

/*
const std1 = {
    nr: 73648,
    name: 'Ze Manel',
    course: 'LEIC'  
}
*/
function makeStudent(nr, name, course) {
    return {
        'nr': nr,
        'name': name,
        'course': course
    }
}

function reflectProps(obj) {
    // Type klass = std1.GetType()
    for (let key in obj) {
        console.log(key + ' = ' + obj[key])
        // klass.GetField(key).GetValue(std1)
    }    
}

const std1 = makeStudent(8478, 'Ze Manel', 'Leic')
const std2 = makeStudent(7386, 'Maria Papoila', 'LEIC')
std1.school = 'ISEL'

reflectProps(std1)
reflectProps(std2)

function reflectProps(obj) {
    // Type klass = std1.GetType()
    for (let key in obj) {
        console.log(key + ' = ' + obj[key])
        // klass.GetField(key).GetValue(std1)
    }    
}

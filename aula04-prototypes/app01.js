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
    for (let key in obj) {
        if(obj.hasOwnProperty(key))
            console.log(key + ' = ' + obj[key])
    }    
}

function Student(nr, name, course) {
    this.nr = nr
    this.name = name
    this.course = course
    /*
    this.print = function(){
        console.log('I am a student!!!')
    }
    */
}

Student.prototype.print = function(){
    console.log('I am a student!!!')
}
Student.prototype.toString = function(){
    return 'Student: ' + this.name
}

const std1 = makeStudent(8478, 'Ze Manel', 'Leic')
const std2 = new Student(7386, 'Maria', 'LEIC')
const std3 = new Student(7625, 'Manel', 'Leetc')

console.log(std1.toString()) 
console.log(std2.toString()) // lookup em std2 -> prototype de std2 --> prototype de Object
console.log(std3.toString())
std3.print()
std2.hello = function() { console.log('Hello!!')}
std2.hello()
// std3.hello() // !!!! So std2 tem a função hello()

std3.constructor.prototype.bar = function() {
    console.log('I am bar!!!')
}
std3.bar()
std2.bar()

Student.prototype.hello = function() {
    console.log('hello() of base Prototype')
}

std3.hello()
std2.hello()
delete std2.hello
std2.hello()

/*
reflectProps(std1)
reflectProps(std3)
*/

// reflectProps(Student.prototype)

/*
console.log(std1 instanceof Object)
console.log(std3 instanceof Object)
console.log(std1 instanceof Student)
console.log(std3 instanceof Student)
*/

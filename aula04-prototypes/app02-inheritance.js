'use strict'

function Person(name) {
    this.name = name
}

Person.prototype.print = function(){
    console.log('I am a person!!!')
}
Person.prototype.toString = function(){
    return 'Person: ' + this.name
}

function Student(nr, name, course) {
    this.nr = nr
    this.name = name
    this.course = course
}

Student.prototype = new Person()
Student.prototype.toString = function(){
    return 'Student: ' + this.name
}



const std2 = new Student(7386, 'Maria', 'LEIC')
const std3 = new Student(7625, 'Manel', 'Leetc')

console.log(std2.toString()) // lookup em std2 -> prototype de std2 --> prototype de Object
console.log(std3.toString())
std3.print()

console.log(std2 instanceof Person )
console.log(std2 instanceof Student )
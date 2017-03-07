'use strict'

const a = [2, 'ola', new Object()]
console.log(a.length) // -> 3
console.log(a)

a[a.length] = 7 // cresce dinamicamente
console.log(a.length) // -> 4
console.log(a)

a.push('isel')
console.log(a.length) // -> 5
console.log(a)

a
    .filter(item => typeof(item) == 'number')
    // .forEach((item, index) => console.log(item + ' on index ' + index))
    // .forEach(console.log)
    .forEach(item => console.log(item))

a.length = 10
console.log(a)
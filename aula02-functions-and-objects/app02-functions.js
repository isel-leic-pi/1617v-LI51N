'use strict'

// const foo = (msg) => {      // Função anónima... MAS o this tem outro significado
// const foo = function(msg) { // Função anónima
function foo(msg) {
    // if(msg == undefined) return console.log('Empty msg')
    if(!msg) return console.log('Empty msg')
    let str = ''
    for(let i = 0; i < arguments.length; i++){
        str += arguments[i] + ', '
    }
    
    console.log('this = ' + this + '; ' + msg + ' (args = ' + str + ')')
}

foo()
foo('ola mundo')
foo(3,4,4,5)
foo.apply(null, [3,4,4,5])
foo.call(null, 'ola', 87364, 22, 'abc', 2, 3)

const d = new foo(89) // !!!!!! NÃO FAZER 

const g = foo

g('Calling foo through g')
new g(76) // !!!!!! NÃO FAZER 

const obj = {} // <=> new Object()
obj.xpto = foo
obj.xpto(345)          // this = obj
obj.xpto.call(d, 6328) // this = d


/* Cenas malucas !!!! 
foo.bar = foo
foo.bar(6666)
*/
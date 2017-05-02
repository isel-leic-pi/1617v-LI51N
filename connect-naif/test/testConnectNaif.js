const connect = require('./../index.js')

function Resp(){
    this.end= () => {}
}

module.exports.testEndFirstMiddlewares = function testEndFirstMiddlewares(test){
    const app = connect()

    function mw1(req, resp) {
        test.ok(true)
        resp.end()
    }
    function mw2(req, resp) {
        test.ok(false)
    }
    function mw3(req, resp) {
        test.ok(false)
    }
    app.use(mw1)
    app.use(mw2)
    app.use(mw3)
    app({}, new Resp())
    test.done()
}

module.exports.testEndSecondMiddlewares = function testEndSecondMiddlewares(test){
    const app = connect()

    function mw1(req, resp, next) {
        test.ok(true)
        next()
    }

    function mw2(req, resp) {
        test.ok(true)
        resp.end()
    }

    function mw3(req, resp) {
        test.ok(false)
    }

    app.use(mw1)
    app.use(mw2)
    app.use(mw3)

    app({}, new Resp())
    test.done()
}

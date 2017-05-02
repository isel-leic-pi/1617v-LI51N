module.exports = initStack

function initStack() {
    /**
     * 1. Stack de Middlewares
     */
    const mws = []
    /**
     * 2. Objecto função (req, resp) => void que será o handler
     * do servidor HTTP. e.g. http.createServer(app)
     */
    const handler = (req, res) => {
        let index = 0
        next()
        function next(){
            if(index < mws.length)
                mws[index++](req, res, next)
        }
    }
    /**
     * 3. Método use() adiciona o mw à pilha.
     */
    handler.use = function(mw) {
        mws.push(mw)
    }
    return handler
}
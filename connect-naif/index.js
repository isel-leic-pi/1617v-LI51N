module.exports = initStak

function initStack() {
    /**
     * 1. Stack de Middlewares
     */
    const mws = []
    
    /**
     * 2. Objecto função (req, resp) => void que será o handler
     * do servidor HTTP. e.g. http.createServer(app)
     */
    const handler = (req, resp) => {
        if(mws.length > 0)
            mws[0](req, res, next)
    }
    function next(){
        // TO DO: Chamar o próximo enquanto existir
    }
    /**
     * 3. Método use() adiciona o mw à pilha.
     */
    handler.use = function(mw) {
        mws.push(mw)
    }
    return handler
}
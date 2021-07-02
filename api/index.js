class IndexHandler {
    
    constructor(expressApp, routePrefix){
        this.app = expressApp;
        this.routePrefix = routePrefix;
    }
    
    mapRoutes(){
        this.app.get(this.routePrefix + '', this.handleRequest);
    }

    handleRequest(req, res){
        res.send('Index Page');
    }
}

module.exports = IndexHandler;
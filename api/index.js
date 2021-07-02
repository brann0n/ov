class IndexHandler {
    
    constructor(expressApp, routePrefix){
        this.app = expressApp;
        this.routePrefix = routePrefix;
    }
    
    mapRoutes(){
        this.app.get(this.routePrefix + '', (req, res) => this.handleRequest(req, res));
    }

    handleRequest(req, res){
        console.log(this.routePrefix);
        res.send('Index Page');
    }
}

module.exports = IndexHandler;
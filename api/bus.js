class BusHandler {
    // api url: https://v0.ovapi.nl/line/ todo: do not request api for the large and mostly static requests like /line
    constructor(expressApp, routePrefix){
        this.app = expressApp;
        this.routePrefix = routePrefix;
    }
    
    mapRoutes(){
        this.app.get(this.routePrefix + '/:id', this.handleRequest);
    }

    handleRequest(req, res){
        res.send(req.params.id);
    }
}

module.exports = BusHandler;
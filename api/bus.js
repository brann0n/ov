import fs, { promises as fsp } from 'fs';

class BusHandler {
    // api url: https://v0.ovapi.nl/line/ todo: do not request api for the large and mostly static requests like /line
    constructor(expressApp, routePrefix) {
        this.app = expressApp;
        this.routePrefix = routePrefix;
    }

    mapRoutes() {
        this.app.get(this.routePrefix + '/', (req, res) => this.getAllBusses(req, res));
        this.app.get(this.routePrefix + '/:id', (req, res) => this.handleRequest(req, res));
    }

    handleRequest(req, res) {
        res.send(req.params.id);
    }

    getAllBusses(req, res) {
        res.setHeader('Content-Type', 'application/json');

        //modify received data to be iterable:


        this.__privateCheckLineStorage().then((json) => {
            let newArray = [];
            for (const [key, value] of Object.entries(json)) {
                newArray.push({ 'key': key, 'value': value });
            }
            res.end(JSON.stringify(newArray));
        });
    }

    async __privateCheckLineStorage() {
        let response = await fsp.readFile("./data/linedata.json", "utf8");
        console.log(response);
        return JSON.parse(response);
    }
}

export default BusHandler;
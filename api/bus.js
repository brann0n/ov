import fs, { promises as fsp } from 'fs';

class BusHandler {
    // api url: https://v0.ovapi.nl/line/ todo: do not request api for the large and mostly static requests like /line
    constructor(expressApp, routePrefix) {
        this.app = expressApp;
        this.routePrefix = routePrefix;

        this.testData = {
            "QBUZZ_g300_1": {
                "LineWheelchairAccessible": "ACCESSIBLE",
                "TransportType": "BUS",
                "DestinationName50": "Groningen",
                "DataOwnerCode": "QBUZZ",
                "DestinationCode": "329",
                "LinePublicNumber": "300",
                "LinePlanningNumber": "g300",
                "LineName": "Emmen - Groningen",
                "LineDirection": 1
            },
            "QBUZZ_g300_2": {
                "LineWheelchairAccessible": "ACCESSIBLE",
                "TransportType": "BUS",
                "DestinationName50": "Emmen",
                "DataOwnerCode": "QBUZZ",
                "DestinationCode": "761",
                "LinePublicNumber": "300",
                "LinePlanningNumber": "g300",
                "LineName": "Emmen - Groningen",
                "LineDirection": 2
            }
        };
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
        let newArray = [];
        for (const [key, value] of Object.entries(this.testData)) {
            newArray.push({ 'key': key, 'value': value });
        }

        this.__privateCheckLineStorage().then((json) => {
            res.end(json);
        });     
    }

    async __privateCheckLineStorage(){
        let response = await fsp.readFile("./data/linedata.json", "utf8");
        console.log(response);
        return response;
    }
}

export default BusHandler;
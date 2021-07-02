const express = require('express');

const IndexHandler = require('./api/index');
const BusHandler = require('./api/bus');

const app = express();
const port = 8081;

const indexHandler = new IndexHandler(app, '/api');
const busHandler = new BusHandler(app, '/api/bus');

//define the routes for this app: the public folder contains all html code.
app.use(express.static('public'))
indexHandler.mapRoutes();
busHandler.mapRoutes();

app.listen(port, () => {
    console.log(`OV app listening at http://localhost:${port}`)
});
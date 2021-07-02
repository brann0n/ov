import express from 'express';

import IndexHandler from './api/index.js';
import BusHandler from './api/bus.js';

const app = express();
const port = 8081;

const indexHandler = new IndexHandler(app, '/api');
const busHandler = new BusHandler(app, '/api/bus');

//define the routes for this app: the public folder contains all html code.
app.use(express.static('public'));
app.use('/static', express.static('staticjs'));
indexHandler.mapRoutes();
busHandler.mapRoutes();

app.listen(port, () => {
    console.log(`OV app listening at http://localhost:${port}`)
});
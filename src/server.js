const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./config/routes')
const config = require('./config/env/index');
const app = express();
const port = config.port;

app.use(cors ( {
    origin: true ,
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));       //user able to see photos in browser - access to 'public' folder
app.use(routes);

connect();

function listen() {
    app.listen(port, () => console.log(`app is now listening to ${port}`))
}

function connect() {
    mongoose.connect(config.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', listen);
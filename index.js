const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_DB_CONFIG } = require('./config/app.config');
const http = require('http');
const server = http.createServer(app);
const { initMeetingServer } = require('./meeting-server');
require('dotenv').config()
    // require("dotenv/config");
    //express is not installed
    //TODO npm add socket.io@2.4.1
    //to start use nodemon js
    //choose your hosting and upload with chanements in package.json and listning server
    //also make sure your mongo db works properly and make sure you are not using any proxy server or vpn it will make it die
    //**remaining TODO Sdp and stun and realtiime stun package sender  and connection and backoff of connected users*/


initMeetingServer(server);
//meeting-server
//initMeetingServer(server)

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION_STRING || MONGO_DB_CONFIG.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected");
    });
app.use(express.json());
app.use("/api", require("./routes/app.routes"));
server.listen(process.env.port || 5000, function() { //change port to PORT
    console.log("Ready to Go!");
});
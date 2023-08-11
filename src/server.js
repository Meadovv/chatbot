import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";

var fs = require('fs');
var https = require('https');

require('dotenv').config();

const httpsPort = 443;

const ssl = {
    cert: fs.readFileSync('./ssl/wodaem_me.crt'),
    ca: fs.readFileSync('./ssl/wodaem_me.ca-bundle'),
    key: fs.readFileSync('./ssl/wodaem_me.key'),
}

const app = express();

viewEngine(app);

webRoutes(app);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

https.createServer(ssl, app).listen(httpsPort, () => {
    console.log(">>> Log: Server is running on port " + httpsPort + " with ssl.");
})


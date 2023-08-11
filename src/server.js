import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";

const fs = require('fs');
const https = require('https');

require('dotenv').config();

const httpsPort = 443;

const httpsOptions = {
    cert: fs.readFileSync('./ssl/wodaem_me.crt'),
    ca: fs.readFileSync('./ssl/wodaem_me.ca-bundle'),
    key: fs.readFileSync('./ssl/wodaem_me.key'),
}

let app = express();

viewEngine(app);

webRoutes(app);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(request, response, next) {
    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }
    next();
})

const httpsServer = https.createServer(httpsOptions, app).listen(httpsPort, () => {
    console.log("AA");
})
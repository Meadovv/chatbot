import express from "express";
import viewEngine from "./configs/ViewEngine";
import webRoutes from "./routes/web";

let crypto = require("crypto")
let { urlencoded, json } = require("body-parser")
let fs = require('fs');
let https = require('https');
let http = require('http');

require('dotenv').config();

const ssl = {
    cert: fs.readFileSync('./ssl/wodaem_me.crt'),
    ca: fs.readFileSync('./ssl/wodaem_me.ca-bundle'),
    key: fs.readFileSync('./ssl/wodaem_me.key'),
}

const app = express();
app.enable('trust proxy')

viewEngine(app);

webRoutes(app);

app.use(json());
app.use(urlencoded({
    extended: true
}));

// verify request from facebook
app.use(json({ verify: verifyRequestSignature }));

// auto redirect to https from http
app.use((req, res, next) => {
    if (!isSecure(req)) {
        return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
});

http.createServer(app).listen(process.env.SERVER_PORT, () => {
    console.log(">>> Log: Server is running on port " + process.env.SERVER_PORT + " in development.");
})

https.createServer(ssl, app).listen(process.env.SERVER_PORT_SSL, () => {
    console.log(">>> Log: Server is running on port " + process.env.SERVER_PORT_SSL + " with ssl.");
})

function verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature-256"];
  
    if (!signature) {
      console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
    } else {
      var elements = signature.split("=");
      var signatureHash = elements[1];
      var expectedHash = crypto
        .createHmac("sha256", config.appSecret)
        .update(buf)
        .digest("hex");
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }
import express from "express";
import viewEngine from "./configs/ViewEngine";
import webRoutes from "./routes/web";

let crypto = require("crypto")
let { urlencoded, json } = require("body-parser")

require('dotenv').config();

let app = express();
app.use(json());
app.use(urlencoded({
    extended: true
}));

viewEngine(app);

webRoutes(app);

// verify request from facebook
app.use(json({ verify: verifyRequestSignature }));

app.listen(process.env.SERVER_PORT, () => {
    console.log(">>> Log: Server is running on port " + process.env.SERVER_PORT);
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
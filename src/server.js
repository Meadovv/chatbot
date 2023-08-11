import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";

require('dotenv').config();

let app = express();

viewEngine(app);

webRoutes(app);

app.use(express.json()); 
app.use(express.urlencoded({
    extended: true
})); 

app.listen(process.env.SERVER_PORT, () => {
    console.log(">>> Log: App is running on port: " + process.env.SERVER_PORT);
});
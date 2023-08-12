import express from "express";
import HomeController from "../controllers/HomeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', HomeController.getHomePage);

    router.post('/facebook', HomeController.receive);
    router.get('/facebook', HomeController.verify);

    return app.use('/', router);
}

module.exports = initWebRoutes;
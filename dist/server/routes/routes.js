"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var door_1 = require("../controllers/door");
var card_1 = require("../controllers/card");
var app_1 = require("../app");
var jwt = require("jsonwebtoken");
function setRoutes(app) {
    var router = express.Router();
    var userCtrl = new user_1.default();
    var doorCtrl = new door_1.default();
    var cardCtrl = new card_1.default();
    router.route('/*').post(auth);
    router.route('/*').put(auth);
    router.route('/*').delete(auth);
    router.route('/*').get(auth);
    router.route('/login').post(userCtrl.login);
    router.route('/logout').post(userCtrl.login);
    router.route('/register').post(userCtrl.register);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    router.route('/door/:id').post(doorCtrl.insert);
    router.route('/door/:id').put(doorCtrl.update);
    router.route('/door/:id').get(doorCtrl.get);
    router.route('/door/:id').delete(doorCtrl.delete);
    router.route('/card/:id').post(cardCtrl.insert);
    router.route('/card/:id').put(cardCtrl.update);
    router.route('/card/:id').get(cardCtrl.get);
    router.route('/card/:id').delete(cardCtrl.delete);
    app.use('/api', router);
}
exports.default = setRoutes;
function auth(req, res, next) {
    console.log('hauth');
    console.log(req.originalUrl);
    if (req.originalUrl.indexOf('login') > 0 || req.originalUrl.indexOf('register') > 0 || req.originalUrl.indexOf('logout') > 0) {
        next();
        return;
    }
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, app_1.jwtSecret, function (err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        console.log('token verified: ');
        req.userId = decoded.id;
        next();
    });
}
exports.auth = auth;
//# sourceMappingURL=routes.js.map
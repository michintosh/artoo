"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
function setRoutes(app) {
    var router = express.Router();
    var userCtrl = new user_1.default();
    router.route('/login').post(userCtrl.login);
    router.route('/register').post(userCtrl.register);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map
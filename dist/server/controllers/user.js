"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var user_1 = require("../models/user");
var base_1 = require("./base");
var bcrypt = require("bcryptjs");
var UserCtrl = /** @class */ (function (_super) {
    __extends(UserCtrl, _super);
    function UserCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = user_1.default;
        _this.login = function (req, res) {
            _this.model.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    return res.sendStatus(403);
                }
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    var token = jwt.sign({ user: user }, 'XyZ2018yAcCeSsi', { expiresIn: 86400 });
                    res.status(200).json({ auth: true, token: token });
                });
            });
        };
        _this.logout = function (req, res) {
            res.status(200).send({ auth: false, token: null });
        };
        _this.register = function (req, res) {
            console.log('register');
            req.body.password = bcrypt.hashSync(req.body.password, 8);
            console.log(JSON.stringify(req.body));
            user_1.default.create(req.body, function (err, user) {
                console.log(JSON.stringify(err));
                if (err)
                    return res.status(500).send("There was a problem registering the user`.");
                var token = jwt.sign({ id: user._id }, 'XyZ2018yAcCeSsi', {
                    expiresIn: 86400
                });
                res.status(200).send({ auth: true, token: token });
            });
        };
        return _this;
    }
    return UserCtrl;
}(base_1.default));
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map
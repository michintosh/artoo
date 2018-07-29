import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import BaseCtrl from './base';
import * as bcrypt from 'bcryptjs';

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, 'XyZ2018yAcCeSsi', {expiresIn: 86400 });
        res.status(200).json({  auth: true, token: token });
      });
    });
  };

  logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
  };


  register = (req, res) => {

    console.log('register');
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    console.log(JSON.stringify(req.body));
    User.create(
      req.body,
      function (err, user) {
        console.log(JSON.stringify(err));
        if (err) return res.status(500).send("There was a problem registering the user`.");

        let token = jwt.sign({ id: user._id }, 'XyZ2018yAcCeSsi', {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
      });
  };

}

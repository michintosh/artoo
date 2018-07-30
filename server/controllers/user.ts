import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import BaseCtrl from './base';
import * as bcrypt from 'bcryptjs';
import {jwtSecret} from '../app';

export default class UserCtrl extends BaseCtrl {

  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      console.log('Crypting: ' + passwordIsValid);
      if (!passwordIsValid) {
        console.log('Not same password: ' + bcrypt.hashSync(req.body.password, 8) + ' ' + user.password );
        return res.sendStatus(403);
      } else {
        console.log('Same password: ' + bcrypt.hashSync(req.body.password, 8) + ' ' + user.password );
        const token = jwt.sign({ user: user }, jwtSecret, {expiresIn: 86400 });
        res.status(200).json({  auth: true, token: token });
      }

      /*
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, jwtSecret, {expiresIn: 86400 });
        res.status(200).json({  auth: true, token: token });
      });*/
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
        if (err) return res.status(500).send('There was a problem registering the user.');

        const token = jwt.sign({ id: user._id }, jwtSecret, {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
      });
  };


/*
  checkSession = (req, res) => {

    console.log('checkSession');
    if(!(req.headers['x-access-token'])){
      console.log("No token");
      res.status(401).send({ auth: false, message: 'No token provided.' });
    } else {
      const token = jwt.sign({ id: user._id }, jwtSecret, {
          expiresIn: 86400
        });
      jwt.verify(token, jwtSecret, function(err, decoded) {
      if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
      console.log('token verified: ')
      req.userId = decoded.id;
      next();
      });
    }
  }*/
    

}

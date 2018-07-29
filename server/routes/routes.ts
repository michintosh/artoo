import * as express from 'express';
import UserCtrl from '../controllers/user';
import DoorCtrl from '../controllers/door';
import CardCtrl from '../controllers/card';
import {jwtSecret} from '../app';
import * as jwt from 'jsonwebtoken';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const doorCtrl = new DoorCtrl();
  const cardCtrl = new CardCtrl();

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

export function auth(req, res, next){
  console.log('hauth');
  console.log(req.originalUrl);

  if (req.originalUrl.indexOf('login')> 0 || req.originalUrl.indexOf('register')> 0 || req.originalUrl.indexOf('logout')> 0){
    next();
    return;
  }

  let token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, jwtSecret, function(err, decoded) {
    if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    console.log('token verified: ')
    req.userId = decoded.id;
    next();
  });
}

import * as express from 'express';
import UserCtrl from '../controllers/user';
import User from '../models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();

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

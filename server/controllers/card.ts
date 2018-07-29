import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import BaseCtrl from './base';
import * as bcrypt from 'bcryptjs';

export default class CardCtrl extends BaseCtrl {
  model = Card;


  insert = (req, res) => {
    };

  update = (req, res) => {
    };

  get = (req, res) => {
    };

  delete = (req, res) => {
    };
}

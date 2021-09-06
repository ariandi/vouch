const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const moment = require('moment');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
  getAllUsers = async (req, res) => {
    res.set('Content-Type', 'application/json');

    let result;
    let where = {}
    if (req.query) {
      where = { where: req.query }
    }

    result = await UserModel.find(where);

    if (result.code !== '00') {
      console.log(result);
      throw new HttpException(500, 'Error when select users');
    }

    res.status(200);
    res.send(result);
  };

  createUser = async (params) => {
    params.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const result = await UserModel.create(params);

    if (!result || result.code !== '00') {
      throw new HttpException(500, 'Something went wrong when insert user');
    }

    return result;
  };

  updateUser = async (paramsSet, paramsWhere) => {
    paramsSet.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const result = await UserModel.update(paramsSet, paramsWhere);

    if (!result || result.code !== '00') {
      throw new HttpException(500, 'Something went wrong when update user');
    }

    return result;
  };

  userLogin = async (req, res) => {
    this.checkValidation(req);

    res.set('Content-Type', 'application/json');
    const { username } = req.body;
    let result = {};

    let user = await UserModel.find({where: {username: username}});
    if (!user) {
      throw new HttpException(401, 'Unable to login!');
    }

    if (user.data.length <= 0) {
      console.log('user not found');
      console.log('prepare insert');
      let params = {
        username: req.body.username,
        is_logged_in: 1,
      };

      user = await this.createUser(params);
      if (!user) {
        throw new HttpException(500, 'Error creating user');
      }

      user = user.data;
    } else {
      user = user.data[0];
      if (user.is_logged_in === 1) {
        result.code = '02';
        result.message = 'user already in chat room';
        result.data = [];
        res.status(403);
        res.send(result);
        return;
      }
    }

    let paramsSet = { is_logged_in: 1 };
    let paramsWhere = { where: { id: user.id  }};

    let userUpdate = await this.updateUser(paramsSet, paramsWhere);
    if (!userUpdate) {
      throw new HttpException(500, 'Error updating user');
    } else {
      user.is_logged_in = 1;
    }

    // user matched!
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
      // expiresIn: '24h'
    });

    result.code = '00';
    result.message = 'success';
    result.data = user;
    result.token = token;

    res.status(200);
    res.send(result);
  };
  //
  checkValidation = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new HttpException(400, 'Validation faild', errors);
    }
  }

}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;

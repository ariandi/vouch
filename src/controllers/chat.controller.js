const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const moment = require('moment');
// const dotenv = require('dotenv');
// dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class ChatController {
  getAllUsers = async (req, res) => {
    res.set('Content-Type', 'text/plain');

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

  // getUserById = async (req, res) => {
  //   const user = await UserModel.findOne({ id: req.params.id });
  //   if (!user) {
  //     throw new HttpException(404, 'User not found');
  //   }
  //
  //   const { password, ...userWithoutPassword } = user;
  //
  //   res.send(userWithoutPassword);
  // };
  //
  // getUserByuserName = async (req, res) => {
  //   const user = await UserModel.findOne({ username: req.params.username });
  //   if (!user) {
  //     throw new HttpException(404, 'User not found');
  //   }
  //
  //   const { password, ...userWithoutPassword } = user;
  //
  //   res.send(userWithoutPassword);
  // };
  //
  // getCurrentUser = async (req, res) => {
  //   const { password, ...userWithoutPassword } = req.currentUser;
  //
  //   res.send(userWithoutPassword);
  // };
  //
  // createUser = async (req, res) => {
  //   logger.info('[user.controller createUser] start.');
  //   logger.info('[user.controller createUser] request params : ' + JSON.stringify(req.body));
  //   this.checkValidation(req);
  //   await this.hashPassword(req);
  //
  //   req = await this.removeRoleNotAdmin(req);
  //
  //   // console.log(req);
  //
  //   req.body.created_by = req.currentUser.id;
  //   req.body.created_at = moment().format('YYYY-MM-DD H:mm:ss');
  //   req.body.updated_at = moment().format('YYYY-MM-DD H:mm:ss');
  //
  //   const result = await UserModel.create(req.body);
  //
  //   if (!result) {
  //     throw new HttpException(500, 'Something went wrong');
  //   }
  //
  //   res.status(201).send('User was created!');
  // };
  //
  // updateUser = async (req, res) => {
  //   logger.info('[user.controller updateUser] start.');
  //   logger.info('[user.controller updateUser] request params : ' + JSON.stringify(req.body));
  //   this.checkValidation(req);
  //   await this.hashPassword(req);
  //
  //   req = await this.removeRoleNotAdmin(req);
  //   let restOfUpdates = {};
  //   if (!req.body.password || req.body.password === null) {
  //     let { confirm_password, password, ...restOfUpdatesTmp } = await req.body;
  //     restOfUpdates = restOfUpdatesTmp;
  //   }else {
  //     let { confirm_password, ...restOfUpdatesTmp } = await req.body;
  //     restOfUpdates = restOfUpdatesTmp;
  //   }
  //
  //   restOfUpdates.updated_by = await req.currentUser.id;
  //   restOfUpdates.updated_at = await moment().format('YYYY-MM-DD H:mm:ss');
  //
  //   // do the update query and get the result
  //   // it can be partial edit
  //   const result = await UserModel.update(restOfUpdates, req.params.id);
  //
  //   if (!result) {
  //     throw new HttpException(404, 'Something went wrong');
  //   }
  //
  //   const { affectedRows, changedRows, info } = result;
  //
  //   const message = !affectedRows ? 'User not found' :
  //       affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';
  //
  //   res.send({ message, info });
  // };
  //
  // updateUserCurrent = async (req, res) => {
  //   logger.info('[user.controller updateUserCurrent] start.');
  //   logger.info('[user.controller updateUserCurrent] request params : ' + JSON.stringify(req.body));
  //   this.checkValidation(req);
  //   await this.hashPassword(req);
  //
  //   req = await this.removeRoleNotAdmin(req);
  //   let restOfUpdates = {};
  //   if (!req.body.password || req.body.password === null) {
  //     let { confirm_password, password, ...restOfUpdatesTmp } = await req.body;
  //     restOfUpdates = restOfUpdatesTmp;
  //   }else {
  //     let { confirm_password, ...restOfUpdatesTmp } = await req.body;
  //     restOfUpdates = restOfUpdatesTmp;
  //   }
  //
  //   restOfUpdates.updated_by = await req.currentUser.id;
  //   restOfUpdates.updated_at = await moment().format('YYYY-MM-DD H:mm:ss');
  //
  //   // do the update query and get the result
  //   // it can be partial edit
  //   const result = await UserModel.updateCurrent(restOfUpdates, req.params.id);
  //
  //   if (!result) {
  //     throw new HttpException(404, 'Something went wrong');
  //   }
  //
  //   const { affectedRows, changedRows, info } = result;
  //
  //   const message = !affectedRows ? 'User not found' :
  //       affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';
  //
  //   res.send({ message, info });
  // };
  //
  // deleteUser = async (req, res) => {
  //   const result = await UserModel.delete(req.params.id);
  //   if (!result) {
  //     throw new HttpException(404, 'User not found');
  //   }
  //   res.send('User has been deleted');
  // };
  //
  // userLogin = async (req, res) => {
  //   logger.info('[user.controller userLogin] start.');
  //   logger.info('[user.controller userLogin] request params : ' + JSON.stringify(req.body));
  //
  //   this.checkValidation(req);
  //
  //   const { email, password: pass } = req.body;
  //
  //   const user = await UserModel.findOne({ email });
  //
  //   if (!user) {
  //     throw new HttpException(401, 'Unable to login!');
  //   }
  //
  //   const isMatch = await bcrypt.compare(pass, user.password);
  //
  //   if (!isMatch) {
  //     throw new HttpException(401, 'Incorrect password!');
  //   }
  //
  //   // user matched!
  //   const secretKey = process.env.SECRET_JWT || "";
  //   const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
  //     // expiresIn: '24h'
  //   });
  //
  //   const { password, ...userWithoutPassword } = user;
  //
  //   res.send({ ...userWithoutPassword, token });
  // };
  //
  // checkValidation = (req) => {
  //   const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     throw new HttpException(400, 'Validation faild', errors);
  //   }
  // }
  //
  // // hash password if it exists
  // hashPassword = async (req) => {
  //   if (req.body.password) {
  //     req.body.password = await bcrypt.hash(req.body.password, 8);
  //   }
  // }
  //
  // removeRoleNotAdmin = async (req) => {
  //   if( req.route.path === '/users-current/id/:id' ) {
  //     if (req.body.role !== 'SuperUser') {
  //       delete req.body.role;
  //     }
  //   }
  //
  //   return req;
  // }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ChatController;

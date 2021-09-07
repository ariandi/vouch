const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = 'Bearer ';

      if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new HttpException(401, 'Access denied. No credentials sent!');
      }

      const token = authHeader.replace(bearer, '');
      const secretKey = process.env.SECRET_JWT || '';

      // Verify Token
      const decoded = jwt.verify(token, secretKey);
      const where = {where : {id: decoded.user_id}};
      let user = await UserModel.find({ where });

      if (!user) {
        throw new HttpException(401, 'Authentication failed!');
      } else {
        user = user.data[0];
      }

      // check if the current user is the owner user
      if (req.params) {
        if (req.params.id) {
          const ownerAuthorized = req.params.id === user.id;
          if (!ownerAuthorized) {
            throw new HttpException(401, 'Unauthorized');
          }
        }
      }
      // const ownerAuthorized = req.params.id === user.id;
      // if the current user is not the owner and
      // if the user role don't have the permission to do this action.
      // the user will get this error
      // if (!ownerAuthorized && roles.length && !roles.includes(roleName)) {
      //   throw new HttpException(401, 'Unauthorized');
      // }

      // if the user has permissions
      req.currentUser = user;
      next();

    } catch (e) {
      e.status = 401;
      next(e);
    }
  }
}

module.exports = auth;

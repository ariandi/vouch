// const query = require('../db/db-connection');
// const HttpException = require('../utils/HttpException.utils');
const { Users } = require('../../models');

class UserModel {
  find = async (params = {}) => {

    let message = 'Success';
    let code = '00';
    let data = [];

    try {
      data = await Users.findAll(params);
    } catch (e) {
      console.log(e);
      message = JSON.stringify(e);
      code = '01';
    }

    return {message, code, data};
  }

  create = async (params) => {
    let message = 'Success';
    let code = '00';
    let data;

    try {
      data = await Users.create(params);
    } catch (e) {
      console.log(e);
      message = JSON.stringify(e);
      code = '01';
    }

    return {message, code, data};
  }

  update = async (params, paramsWhere) => {
    let message = 'Success';
    let code = '00';
    let data;

    try {
      data = await Users.update(params, paramsWhere);
    } catch (e) {
      console.log(e);
      message = JSON.stringify(e);
      code = '01';
    }

    return {message, code, data};
  }

  // update = async (params, id) => {
  //   logger.info('[user.models update] start.');
  //
  //   delete params.id;
  //   const { role_id, role, company_id, block_des_name, block_name, created_by, created_at, active,
  //     block_id, block_sub_name, company_name, role_name, block_id_old, ...userParams } = params;
  //
  //   let roleParams = {
  //     role_id: params.role,
  //     active: 1,
  //   }
  //
  //   let blockParams = {
  //     block_id: params.block_id,
  //     active: 1,
  //     updated_at: params.updated_at,
  //     updated_by: params.updated_by
  //   }
  //
  //   const cKey1 = await this.toColumnSetAsync(userParams);
  //   const cKey2 = await this.toColumnSetAsync(roleParams);
  //   const cKey3 = await this.toColumnSetAsync(blockParams);
  //
  //   let sql = {};
  //   sql.users = `UPDATE ${this.tableName} SET ${cKey1.columnSet} WHERE id = ?`;
  //   sql.users_roles = `UPDATE ${this.ref1} SET ${cKey2.columnSet} WHERE user_id = ? and role_id = ?`;
  //   if (params.block_id_old === null) {
  //     sql.users_blocks = `UPDATE ${this.ref3} SET ${cKey3.columnSet} WHERE user_id = ?`;
  //   } else {
  //     sql.users_blocks = `UPDATE ${this.ref3} SET ${cKey3.columnSet} WHERE user_id = ? and block_id = ?`;
  //   }
  //
  //   let paramsObj = {};
  //   paramsObj.users = [...cKey1.values, id];
  //   paramsObj.users_roles = [...cKey2.values, id, params.role_id];
  //   if (params.block_id_old === null) {
  //     paramsObj.users_blocks = [...cKey3.values, id];
  //   } else {
  //     paramsObj.users_blocks = [...cKey3.values, id, params.block_id_old];
  //   }
  //
  //   // console.log(sql);
  //   // console.log(paramsObj);
  //
  //   const result = await query.queryUpdateUser(sql, paramsObj);
  //   if (!result) {
  //     throw new HttpException(404, 'Something went wrong');
  //   }
  //
  //   return result;
  // }
  //
  // updateCurrent = async (params, id) => {
  //   logger.info('[user.models updateCurrent] start.');
  //
  //   delete params.id;
  //   const { role_id, role, company_id, block_des_name, block_name, created_by, created_at, active,
  //     block_id, block_sub_name, company_name, role_name, block_id_old, ...userParams } = params;
  //
  //   const cKey1 = await this.toColumnSetAsync(userParams);
  //
  //   let sql = `UPDATE ${this.tableName} SET ${cKey1.columnSet} WHERE id = ?`;
  //
  //   let paramsObj = [...cKey1.values, id];
  //
  //   const result = await query.query(sql, paramsObj);
  //   if (!result) {
  //     throw new HttpException(404, 'Something went wrong');
  //   }
  //
  //   return result;
  // }
  //
  // delete = async (id) => {
  //   const sql = `UPDATE ${this.tableName} SET active = 0
  //       WHERE id = ?`;
  //   const result = await query.query(sql, [id]);
  //   const affectedRows = result ? result.affectedRows : 0;
  //
  //   console.log('deleted id : '+ id);
  //
  //   return affectedRows;
  // }
}

module.exports = new UserModel;

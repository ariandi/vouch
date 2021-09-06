// const query = require('../db/db-connection');
// const HttpException = require('../utils/HttpException.utils');
const { Chats } = require('../../models');

class ChatModel {
  find = async (params = {}) => {

    let message = 'Success';
    let code = '00';
    let data = [];

    try {
      data = await Chats.findAll(params);
    } catch (e) {
      console.log(e);
      message = JSON.stringify(e);
      code = '01';
    }

    return {message, code, data};
  }

  // findOne = async (params) => {
  //   logger.info('[user.model findOne] start.');
  //   let sql = this.selectQuery();
  //
  //   if (!Object.keys(params).length) {
  //     sql += ` WHERE ${this.tableName}.active = 1 ORDER BY ${this.tableName}.full_name`;
  //     return await query.query(sql);
  //   }
  //
  //   const {columnSet, values} = multipleColumnSet(params)
  //   sql += ` WHERE ${this.tableName}.active = 1 and ${this.tableName}.${columnSet}
  //             ORDER BY ${this.tableName}.full_name`;
  //
  //   // console.log(sql);
  //   logger.info('[user.model findOne] start.' + sql);
  //
  //   const result = await query.query(sql, [...values]);
  //
  //   // return back the first row (user)
  //   return result[0];
  // }
  //
  // create = async (params) => {
  //   logger.info('[user.models create] start.');
  //
  //   const { role, confirm_password, company_id, block_id, ...userParams } = params;
  //   userParams.active = 1;
  //
  //   let roleParams = {
  //     role_id: params.role,
  //     created_by: params.created_by,
  //     created_at: params.created_at,
  //     updated_at: params.updated_at,
  //     active: 1,
  //   }
  //
  //   let companyParams = {
  //     company_id: params.company_id,
  //     created_by: params.created_by,
  //     created_at: params.created_at,
  //     updated_at: params.updated_at,
  //     active: 1,
  //   }
  //
  //   let blockParams = {
  //     block_id: params.block_id,
  //     created_by: params.created_by,
  //     created_at: params.created_at,
  //     updated_at: params.updated_at,
  //     active: 1,
  //   }
  //
  //   const cKey1 = await this.toColumnSetAsync(userParams);
  //   const cKey2 = await this.toColumnSetAsync(roleParams);
  //   const cKey3 = await this.toColumnSetAsync(companyParams);
  //   const cKey4 = await this.toColumnSetAsync(blockParams);
  //
  //   let sql = {};
  //   sql.users = `INSERT INTO ${this.tableName} SET ${cKey1.columnSet}`;
  //   sql.users_roles = `INSERT INTO ${this.ref1} SET ${cKey2.columnSet}, user_id = ?`;
  //   sql.users_companies = `INSERT INTO ${this.ref2} SET ${cKey3.columnSet}, user_id = ?`;
  //   sql.users_blocks = `INSERT INTO ${this.ref3} SET ${cKey4.columnSet}, user_id = ?`;
  //
  //   let paramsObj = {};
  //   paramsObj.users = [...cKey1.values];
  //   paramsObj.users_roles = [...cKey2.values];
  //   paramsObj.users_companies = [...cKey3.values];
  //   paramsObj.users_blocks = [...cKey4.values];
  //
  //   logger.info('[user.models create] sql.' + JSON.stringify(sql));
  //   logger.info('[user.models create] params.' + JSON.stringify(paramsObj));
  //
  //   const result = await query.queryCreateUser(sql, paramsObj);
  //   if (!result) {
  //     logger.info('[user.models create] queryCreateUser error');
  //     throw new HttpException(500, 'Something went wrong');
  //   }
  //
  //   // console.log(result)
  //   const affectedRows = result ? result.affectedRows : 0;
  //   return affectedRows;
  // }
  //
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
  //
  // selectQuery() {
  //   let sql = `SELECT ${this.tableName}.*, ${this.ref1_ref}.role_name, ${this.ref1}.role_id,
  //               ${this.ref2_ref}.name AS company_name, ${this.ref2}.company_id,
  //               ${this.ref3}.block_id, ${this.ref3_ref}.block_name,
  //               ${this.ref3_ref}.block_sub_name, ${this.ref3_ref}.block_des_name
  //               FROM ${this.tableName}
  //               JOIN ${this.ref1} on ${this.ref1}.user_id = ${this.tableName}.id and ${this.ref1}.active = 1
  //               JOIN ${this.ref1_ref} on ${this.ref1}.role_id = ${this.ref1_ref}.id and ${this.ref1_ref}.active = 1
  //               JOIN ${this.ref2} on ${this.ref2}.user_id = ${this.tableName}.id and ${this.ref2}.active = 1
  //               JOIN ${this.ref2_ref} on ${this.ref2}.company_id = ${this.ref2_ref}.id and ${this.ref2_ref}.active = 1
  //               JOIN ${this.ref3} on ${this.ref3}.user_id = ${this.tableName}.id and ${this.ref3}.active = 1
  //               JOIN ${this.ref3_ref} on ${this.ref3}.block_id = ${this.ref3_ref}.id and ${this.ref3_ref}.active = 1`;
  //
  //   return sql;
  // }
  //
  // async toColumnSetAsync (params) {
  //   return await multipleColumnSet(params);
  // }
}

module.exports = new ChatModel;

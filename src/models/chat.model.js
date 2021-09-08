// const query = require('../db/db-connection');
// const HttpException = require('../utils/HttpException.utils');
const Chats = require('../../models/ChatsMonggo');

class ChatModel {
  find = async (params = {}) => {

    let message = 'Success';
    let code = '00';
    let data = [];

    try {
      data = await Chats.find(params);
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

    const ChatsPost = new Chats(params);

    try {
      console.log(params)
      data = await ChatsPost.save(params);
    } catch (e) {
      console.log(e);
      message = JSON.stringify(e);
      code = '01';
    }

    return {message, code, data};
  }
}

module.exports = new ChatModel;

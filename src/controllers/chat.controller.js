const ChatModel = require('../models/chat.model');
const HttpException = require('../utils/HttpException.utils');
const moment = require('moment');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class ChatController {
  getAllChat = async (req, res) => {
    res.set('Content-Type', 'application/json');

    let result;
    let where = {}
    if (req.query) {
      where = { where: req.query }
    }

    result = await ChatModel.find(where);

    if (result.code !== '00') {
      console.log(result);
      throw new HttpException(500, 'Error when select users');
    }

    res.status(200);
    res.send(result);
  };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ChatController;

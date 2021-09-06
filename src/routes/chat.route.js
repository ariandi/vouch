const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
// const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, validateLogin } = require('../middleware/validator/chatValidator.middleware');


router.get('/users/', [], awaitHandlerFactory(userController.getAllUsers));
router.get('/chats/', [], awaitHandlerFactory(chatController.getAllChat));
router.post('/chats/', auth(), awaitHandlerFactory(chatController.createChat));
// router.get('/users/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users

// router.get('/users/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
// router.get('/users/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
// router.get('/users/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami

// router.post('/users/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users

// router.post('/users/', auth(Role.SuperUser.name), createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
// router.patch('/users/id/:id', auth(Role.SuperUser.name), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
// router.patch('/users-current/id/:id', auth(), awaitHandlerFactory(userController.updateUserCurrent));
// router.delete('/users/id/:id', auth(Role.SuperUser.name), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1


router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/apiv1/login

module.exports = router;

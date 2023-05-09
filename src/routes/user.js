const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const loginMiddleware = require('../app/middlewares/LoginMiddleware');

// Define 'user' route
router.get('/login', userController.login);
router.post('/authen', userController.authen);
router.get('/logout', userController.logout);
router.get('/create', userController.create);
router.post('/store', userController.store);
router.use(loginMiddleware); // Middleware Kiểm tra user login
router.get('/change/password', userController.changePassword);
router.put('/:id/update/password', userController.updatePassword);

module.exports = router;
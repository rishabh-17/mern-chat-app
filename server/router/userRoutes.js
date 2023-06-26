const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/setavatar/:id', userController.setAvatar)
router.get('/allusers/:id', userController.getAll)

module.exports = router;

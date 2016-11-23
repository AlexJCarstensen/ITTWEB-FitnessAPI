var express = require('express');
var router = express.Router();



var authenticationController = require('../controllers/authentication.controllers.js');
/* GET users listing. */
router
    .post('/register', authenticationController.register)
    .post('/login', authenticationController.login);

module.exports = router;
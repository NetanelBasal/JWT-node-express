var express = require('express'),
    authMw  = require(require('app-root-path') + '/middlewares/auth.middleware');

router = express.Router();

router.post('/login', require('./login.controller.js'));

module.exports = router;
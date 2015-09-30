var express            = require('express'),
    router             = express.Router();

router.post('/register', require('./register.controller'));

module.exports = router;
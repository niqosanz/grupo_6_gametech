var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', usersController.list);
router.get('/register', usersController.create);

module.exports = router;

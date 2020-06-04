var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', usersController.list);
router.get('/register', usersController.create);
router.get('/admin', usersController.admin);
router.post('/admin', usersController.products);

module.exports = router;

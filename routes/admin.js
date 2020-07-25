var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');



/* GET users listing. */
router.get('/', adminController.list);


module.exports = router;


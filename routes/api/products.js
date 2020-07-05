var express = require('express');
var router = express.Router();
var multer = require ('multer')
let path = require('path')
var apiProductController = require('../../controllers/api/apiProductController')
var app = express();


/* GET products listing. */
router.get('/', apiProductController.list);



module.exports = router;
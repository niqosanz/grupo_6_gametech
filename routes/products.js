var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')


/* GET users listing. */
router.get('/', productController.list);
router.get('/create', productController.create);
router.post('/create', productController.add);
router.get('/:id', productController.detail);


module.exports = router;

var express = require('express');
var router = express.Router();
var multer = require ('multer')
let path = require('path')
var productController = require('../controllers/productController')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'..','public/images/productos'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/', productController.list);
router.get('/create', productController.create);
router.post('/create',upload.any(), productController.add);
router.get('/:id', productController.detail);



module.exports = router;

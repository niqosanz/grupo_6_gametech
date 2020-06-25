var express = require('express');
var router = express.Router();
var multer = require ('multer')
let path = require('path')
var productController = require('../controllers/productController')
const {check,validationResult,body}=require('express-validator');


var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'..','public/images/productos'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


/* GET products listing. */
router.get('/', productController.list);

router.get('/prueba', productController.adress);

router.get('/create', productController.create);
router.post('/create',upload.any(),[check('name').not().isEmpty().withMessage('El campo Nombre es Obligatorio.'),check('name').isLength({min:4}).withMessage('El campo Nombre debe contener al menos 4 caracteres'),],productController.add);
router.get('/:id', productController.detail);
router.get('/edit/:id', productController.viewedit);
router.put('/edit/:id', productController.edit);
router.delete('/delete/:id', productController.destroy);




module.exports = router;

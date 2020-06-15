var express = require('express');
var router = express.Router();

// Para requerir la ruta del controlador

let registerController = require('../controllers/registerController');

// Para requerir el método de FileSystem para leer y escribir archivos

let fs = require('fs');

// Para encriptar el password del usuario

let bcrypt = require('bcrypt');

// Para validar campos usando express validator
const {check,validationResult,body}=require('express-validator');



// Para cargar un archivo (imagen avatar):

let path = require('path');

const multer = require('multer');
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/Images/avatar-users');
  },
  filename: function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
  }
}); 

var upload = multer({storage:storage});


/* GET Register. */
/* Esta es la ruta que va presentar la vista para el ingreso de la información para el */
/* loggin del usuario */

router.get('/', registerController.ingreso);



/* GET Status Usuario */ 
/* Esta es la ruta para cuando el usuario ingresado NO está registrado o es incorrecto el email o contraseña */

// (Registrado o NO registrado o con errores de ingreso de usuario o clave) */
router.get('/:id', registerController.status);



/* GET Creación de Usuario Nuevo */
/* Esta es la ruta que mostrará la vista con los campos para la creación de un nuevo usuario */

router.get('/:id/createuser', registerController.creacionUsuario);


/* POST Validation. */
// Esta es la ruta que valida los datos enviados en el formulario de registro del usuario

router.post('/',[
  check('password').isLength({min:4}).withMessage('La contraseña debe contener al menos 8 caracteres'),
],registerController.validation);

/* POST Cargar datos usuario nuevo */
router.post('/:id/createuser',upload.any(),registerController.cargarDatosUsuario);


module.exports = router;
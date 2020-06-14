var express = require('express');
var router = express.Router();

// Para requerir la ruta del controlador

// let registerController = require('../controllers/registerController');


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

// Para requerir el método de FileSystem para leer y escribir archivos

let fs = require('fs');

// Para encriptar el password del usuario

let bcrypt = require('bcrypt');

/* GET Register. */
/* Esta es la ruta que va presentar la vista para el ingreso de la información para el */
/* loggin del usuario */

router.get('/', function(req, res, next) {
  res.render('register',{pageCss: 'register.css',statusRegistracion: ''});
});



/* GET Status Usuario */ 
/* Esta es la ruta para cuando el usuario ingresado NO está registrado o es incorrecto el email o contraseña */

// (Registrado o NO registrado o con errores de ingreso de usuario o clave) */
router.get('/:id', function(req, res, next) {
  
    let statusRegistroUsuario = req.params.id;

    if(statusRegistroUsuario){
      res.render('register',{pageCss: 'register.css',statusRegistracion: 'Usuario o Contraseña incorrecta.'});
    }else{
      res.render('register',{pageCss: 'register.css',statusRegistracion: ''});

    }

});



/* GET Creación de Usuario Nuevo */
/* Esta es la ruta que mostrará la vista con los campos para la creación de un nuevo usuario */

router.get('/:id/createuser', function(req, res, next) {
  
  res.render('createuser',{pageCss: 'register.css'});

});


/* GET Validation. */
// Esta es la ruta que valida los datos enviados en el formulario de registro del usuario

router.post('/',function(req, res, next) {

  let users = fs.readFileSync('data/DBUsers.json',{encoding:'utf-8'});
  let usersJSON = JSON.parse(users);

  for(let i = 0; i<usersJSON.length; i++){

    if(req.body.email == usersJSON[i].email && req.body.password == usersJSON[i].password ){

      res.redirect('/');

    }else{

      res.redirect('/register/1');
    }

  }

});

/* POST Cargar datos usuario nuevo */
router.post('/:id/createuser', upload.any(), function(req, res, next) {

  let password = bcrypt.hashSync(req.body.password,12);

  let newUser = {

    email: req.body.email,
    password: password,
    avatar: req.files[0].filename,
 
  };


  let usersJSON = fs.readFileSync('data/DBUsers.json',{encoding: 'utf-8'});
  let users;

  if(usersJSON == ''){
    users = [];

    users.push(newUser);
  
    res.send(users);
  
    usersUpdatedJSON = JSON.stringify(users);
  
     fs.writeFileSync('data/DBUsers.json',usersUpdatedJSON);
  
     res.send('Bienvenido!, Sus datos ya fueron ingresados!!');


  }else{
    users = JSON.parse(usersJSON);
    
  for(let i=0; i<users.length; i++){

    if(users[i].email == newUser.email){
      res.send('Usuario existente en la base de datos!');

    }else{


      users.push(newUser);
  
      res.send(users);
    
      usersUpdatedJSON = JSON.stringify(users);
    
       fs.writeFileSync('data/DBUsers.json',usersUpdatedJSON);
    
       res.send('Bienvenido!, Sus datos ya fueron ingresados!!');

    }
    

  }

  }




  });


module.exports = router;
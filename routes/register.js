var express = require('express');
var router = express.Router();
let fs = require('fs');

/* GET Register. */
router.get('/', function(req, res, next) {
  res.render('register',{pageCss: 'register.css',statusRegistracion: ''});
});



/* GET Status Usuario (Registrado o NO registrado o con errores de ingreso de usuario o clave) */
router.get('/:id', function(req, res, next) {
  
    let statusRegistroUsuario = req.params.id;

    if(statusRegistroUsuario){
      res.render('register',{pageCss: 'register.css',statusRegistracion: 'Usuario o Contraseña incorrecta.'});
    }else{
      res.render('register',{pageCss: 'register.css',statusRegistracion: ''});

    }

});


/* GET Creación de Usuario Nuevo */
router.get('/:id/createuser', function(req, res, next) {
  
  res.render('createuser',{pageCss: 'register.css'});

});


/* GET Validation. */
router.post('/', function(req, res, next) {

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




module.exports = router;
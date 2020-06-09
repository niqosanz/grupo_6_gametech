var express = require('express');
var router = express.Router();
const multer = require('multer');
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,/public/Images)
  },
  filename: function(req,file,cb){
    cb(null,file.fieldname+'-'+ Date.now);
  }
});

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

/* POST Cargar datos usuario nuevo */
router.post('/:id/createuser', function(req, res, next) {


  let newUser = {

    email: req.body.email,
    password: req.body.password,
    avatar: '',
 
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
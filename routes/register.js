var express = require('express');
var router = express.Router();
let fs = require('fs');

/* GET Register. */
router.get('/', function(req, res, next) {
  res.render('register',{pageCss: 'register.css',statusRegistracion: ''});
});



/* GET Register. */
router.get('/:id', function(req, res, next) {
  
    let statusRegistroUsuario = req.params.id;

    if(statusRegistroUsuario){
      res.render('register',{pageCss: 'register.css',statusRegistracion: 'Usuario o Contraseña incorrecta.'});
    }else{
      res.render('register',{pageCss: 'register.css',statusRegistracion: ''});

    }

});



/* GET Validation. */
router.post('/', function(req, res, next) {

    let users = fs.readFileSync('data/DBUsers.json',{encoding:'utf-8'});
    let usersJSON = JSON.parse(users);

    for(let i = 0; i<usersJSON.length; i++){

      if(req.body.email == usersJSON[i].email && req.body.password == usersJSON[i].password ){
        res.send('Usuario Existente');

      }else{

        res.redirect('/register/1');
      }

    }

});




module.exports = router;
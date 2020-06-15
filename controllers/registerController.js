// Para requerir el método de FileSystem para leer y escribir archivos

let fs = require('fs');

// Para encriptar el password del usuario

let bcrypt = require('bcrypt');

// Para tomar los valores de los errores que se presenten en la validación usada 
// con express validator en la ruta

const {check,validationResult,body}=require('express-validator');


// Inicio del controlador

const registerController = {


    'ingreso': function(req, res, next) {
        res.render('register',{pageCss: 'register.css',statusRegistracion: ''});
      },


    'validation': function(req, res, next) {

        // Se define una variable con los errores de express validator que se encuentren, con la validación
        // definida en la ruta


      // valida si los datos ingresados por el usuario son válidos o no

      let errors = validationResult(req);

      if(errors.isEmpty()){

        let users = fs.readFileSync('data/DBUsers.json',{encoding:'utf-8'});
        let usersJSON = JSON.parse(users);


        for(let i = 0; i<usersJSON.length; i++){

        // si los datos ingresados de usuario o contraseña son válidos: 

          if(req.body.email == usersJSON[i].email && (bcrypt.compareSync(req.body.password ,usersJSON[i].password))){
      
            res.redirect('/');

        // si los datos ingresados de usuario o contraseña son inválidos: 

          }else{
      

          }

        }
        
        res.redirect('/register/1');


      }else{

        res.render('register', {errors: errors.errors,pageCss: 'register.css',statusRegistracion: 'Usuario o Contraseña incorrecta.'});

      }

      },


        //   En caso que el usuario o contraseña ingresados no sean correctos, notifica y pide nuevamente los datos

      'status': function(req, res, next) {
  
        let statusRegistroUsuario = req.params.id;
    
        //   Si viene de un usuario que intentó registrarse anteriormente pero con algún dato erróneo lo remarca.
        //   Status 1 para usuarios que ingresaron erróneamente previamente.

        if(statusRegistroUsuario){

          res.render('register',{errors: [],pageCss: 'register.css',statusRegistracion: 'Usuario o Contraseña incorrecta.'});

        //   Si un usuario llega por primera vez a la página de registro 
        //   Status ''

        }else{
          res.render('register',{errors: [],pageCss: 'register.css',statusRegistracion: ''});
    
        }
    
    },

    'creacionUsuario': function(req, res, next) {
  
        res.render('createuser',{pageCss: 'register.css'});
      
      },

    'cargarDatosUsuario': function(req, res, next) {

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
      
      
    }

}

module.exports = registerController


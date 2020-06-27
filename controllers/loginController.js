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


      let users = fs.readFileSync('data/DBUsers.json',{encoding:'utf-8'});
      let usersJSON = JSON.parse(users);
      

        // Se define una variable con los errores de express validator que se encuentren, con la validación
        // definida en la ruta


      // valida si los datos ingresados por el usuario son válidos o no

      let errors = validationResult(req);

      if(errors.isEmpty()){


        for(let i = 0; i<usersJSON.length; i++){

        // si los datos ingresados de usuario o contraseña son válidos: 

          if(req.body.email == usersJSON[i].email && (bcrypt.compareSync(req.body.password ,usersJSON[i].password))){
      
            res.redirect('/');

        // si los datos ingresados de usuario o contraseña son inválidos: 

          }else{
      

          }

        }
        
        res.redirect('/login/1');


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
  
        res.render('createuser',{pageCss: 'register.css',statusRegistracion: ''});
      
      },

    'cargarDatosUsuario': function(req, res, next) {

      const datosArchivo = req.files[0];

     
      // valida si los datos ingresados por el usuario son válidos o no

      let errors = validationResult(req);

      if(errors.isEmpty() && (datosArchivo.mimetype=='image/jpeg' || datosArchivo.mimetype=='image/jpg' || datosArchivo.mimetype=='image/png' || datosArchivo.mimetype=='image/gif')){

        // JPG, JPEG, PNG, GIF

        let password = bcrypt.hashSync(req.body.password,12);
      
        let newUser = {
        
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          password: password,
          avatar: req.files[0].filename,
         
        };

                
        let usersJSON = fs.readFileSync('data/DBUsers.json',{encoding: 'utf-8'});
        let users;
        
        if(usersJSON == ''){
          users = [];
        
          users.push(newUser);
          
          usersUpdatedJSON = JSON.stringify(users);
          
          fs.writeFileSync('data/DBUsers.json',usersUpdatedJSON);
          
          res.redirect('/');
        
        
        }else{
          users = JSON.parse(usersJSON);
            
          for(let i=0; i<users.length; i++){
          
            if(users[i].email == newUser.email){

              res.redirect('/');
          
            }else{
          
          
              users.push(newUser);

              usersUpdatedJSON = JSON.stringify(users);
              
              fs.writeFileSync('data/DBUsers.json',usersUpdatedJSON);

              // res.send(users);
              
              res.redirect('/');

              
            }
            
        
          }
      
        }

              
      }else{
        

        res.render('createuser', {errors: errors.errors,pageCss: 'register.css',statusRegistracion: 'Error en el ingreso de los datos.'});

      }
      
    }

}

module.exports = registerController


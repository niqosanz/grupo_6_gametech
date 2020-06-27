// Para requerir el método de FileSystem para leer y escribir archivos

let fs = require('fs');

// Para encriptar el password del usuario

let bcrypt = require('bcrypt');

// Para tomar los valores de los errores que se presenten en la validación usada 
// con express validator en la ruta

const {check,validationResult,body}=require('express-validator');


// Inicio del controlador

const loginController = {


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

module.exports = loginController


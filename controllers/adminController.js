var express = require('express');
var db = require('../db/models');



module.exports={
  list: function (req, res) {
    db.Product.findAll({ include: [{ association: "brand" }, 
    { association: "category" }] }).then(function (resultados){
        db.Category.findAll().then(function(categorias){
            if(req.cookies.recordame == undefined){ 
              // console.log(categorias)
            res.redirect ('login');
      }else {
            res.render ('admin',{errors:'',usuario: req.cookies.recordame, resultados,categorias});
      }
      })
    })
},

clients: function (req, res) {
  db.User.findAll().then(function (usuarios){
      db.Category.findAll().then(function(categorias){
          if(req.cookies.recordame == undefined){ 
            console.log(usuarios[0].image)
            res.redirect ('login');
    }else {
          res.render ('clientList',{errors:'',usuario: req.cookies.recordame, usuarios,categorias});
    }
    })
  })
},



}

//     list: function (req,res){
   


//       if(req.cookies.recordame == undefined){

//         db.Product.findAll({include:[{association:"brand"},{association:"category"}]})
//         .then(function (resultados){

//           res.render('admin', {errors: '',usuario: '', resultados: resultados, resultados2: resultados2})
//         })
        
      
//       }else {
      
//         db.Product.findAll({include:[{association:"brand"},{association:"category"}]})
//         .then(function (resultados){
//           res.render ('admin',{errors: '',usuario: req.cookies.recordame, resultados: resultados, resultados2: resultados2});
//         })
        
//       }

//     }


// }
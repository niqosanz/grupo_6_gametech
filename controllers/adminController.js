var express = require('express');
var db = require('../db/models');



module.exports={

    list: function (req,res){
      if(req.cookies.recordame == undefined){

        res.render('admin', {errors: '',usuario: ''})

      }else {
        res.render ('admin',{errors: '',usuario: req.cookies.recordame});
    
      }

      },

      // list: function (req,res) {
      //   db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (resultados){
      //     console.log(resultados);
      //     res.render('admin',resultados)
      //   },)
      // },
  
  }
  
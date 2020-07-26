var express = require('express');
var db = require('../db/models');



module.exports={

    // list: function (req,res){
    //   res.render('admin')
    //   },

    list: function (req,res) {
      db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (resultados){
        console.log(resultados);
        res.render('admin',resultados)
      },)
    },
  
  }
  
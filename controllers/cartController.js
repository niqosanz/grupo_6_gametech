var express = require('express');
var db = require('../db/models');



module.exports={
  add: function (req, res) {
    db.Product.findAll({ include: [{ association: "brand" }, 
    { association: "category" }] }).then(function (resultados){
        db.Category.findAll().then(function(categorias){
            if(req.cookies.recordame == undefined){ 
              console.log(categorias)
            res.render ('productCart',{errors:'',usuario: '',categorias, resultados});
      }else {
            res.render ('productCart',{errors:'',usuario: req.cookies.recordame, resultados,categorias});
      }
      })
    })
}}
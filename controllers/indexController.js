var express = require('express');
var db = require('../db/models');



module.exports={
    list: function(req, res){
        db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (resultados){
            db.Category.findAll().then(function(categorias){
            let productos = resultados 
            if(req.cookies.recordame == undefined){ 
              console.log(productos[1].dataValues)
            res.render ('index',{usuario: '',categorias, productos});
      }else {
            res.render ('index',{usuario: req.cookies.recordame, productos,categorias});
      }
      })
      
      },
      )},
      
      preguntas: function(req, res){

        console.log(req.body.search)
        db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (resultados){
            db.Category.findAll().then(function(categorias){
            let productos = resultados 
            if(req.cookies.recordame == undefined){ 
              console.log(productos[1].dataValues)
            res.render ('faq',{usuario: '',categorias, productos});
      }else {
            res.render ('faq',{usuario: req.cookies.recordame, productos,categorias});
      }
      })
      
      },
      )
      
      },
      






  search: function (req, res) {
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
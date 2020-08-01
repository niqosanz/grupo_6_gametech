var express = require('express');
var db = require('../db/models');
var Sequelize = require('sequelize');
//const { notIn } = require('sequelize/types/lib/operators');
//var op = Sequelize.Op;




module.exports={
    list: function(req, res){

      // var datoABuscar =req.query.search
      // console.log(req.query.search)

        db.Product.findAll(
          // {where:{
          //   short_description:{[db.Sequelize.Op.substring]: '%' + datoABuscar}
          // }},
          {include:[{association:"brand"},{association:"category"}]})
          .then(function (productos){
            db.Category.findAll().then(function(categorias){
              console.log(productos)
      

            if(req.cookies.recordame == undefined){ 
            res.render ('index',{usuario: '',categorias, productos});
      }else {
            res.render ('index',{usuario: req.cookies.recordame, productos,categorias});
      }
      })
      
      },
      )},
      
      preguntas: function(req, res){

        db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (resultados){
            db.Category.findAll().then(function(categorias){
            let productos = resultados 
            if(req.cookies.recordame == undefined){ 
            res.render ('faq',{usuario: '',categorias, productos});
      }else {
            res.render ('faq',{usuario: req.cookies.recordame, productos,categorias});
      }
      })
      
      },
      )
      
      },
      






  search: function (req, res) {
    res.send(req.query)
}


}
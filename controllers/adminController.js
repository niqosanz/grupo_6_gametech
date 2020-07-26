var express = require('express');
var db = require('../db/models');



module.exports={

    list: function (req,res){
      
      let resultados2 = [
        {
          price: 123
        },
        {price: 456
        }
      ];


      if(req.cookies.recordame == undefined){

        db.Product.findAll({include:[{association:"brand"},{association:"category"}]})
        .then(function (resultados){
          console.log(resultados);

          // res.json(resultados)

          res.render('admin', {errors: '',usuario: '', resultados: resultados, resultados2: resultados2})
        })
        
      
      }else {
      
        db.Product.findAll({include:[{association:"brand"},{association:"category"}]})
        .then(function (resultados){
          console.log(resultados);
          // res.json(resultados)

          res.render ('admin',{errors: '',usuario: req.cookies.recordame, resultados: resultados, resultados2: resultados2});
        })
        
      }

    }


}
  
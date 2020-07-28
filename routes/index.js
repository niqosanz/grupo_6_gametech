var express = require('express');
var router = express.Router();
var db = require('../db/models');

/* GET home page. */
router.get('/', function(req, res){
  db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (resultados){
    let productos = resultados 
    if(req.cookies.recordame == undefined){ 
      res.render ('index',{usuario: '', productos});
  }else {
    res.render ('index',{usuario: req.cookies.recordame, productos });

  }
    
},
)
  
  
});
router.get('/pruebaSession', function(req,res){
  if (req.session.numeroVisitas == undefined){
    req.session.numeroVisitas = 0;
  }
  req.session.numeroVisitas++;
  res.send('Session tiene numer: ' + req.session.numeroVisitas);
})

module.exports = router;

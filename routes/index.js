var express = require('express');
var router = express.Router();
var db = require('../db/models');

/* GET home page. */
router.get('/', function(req, res){
  db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (resultados){
      db.Category.findAll().then(function(categorias){
      let productos = resultados 
      if(req.cookies.recordame == undefined){ 
      res.render ('index',{usuario: '',categorias, productos});
}else {
      res.render ('index',{usuario: req.cookies.recordame, productos,categorias});
}
})

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







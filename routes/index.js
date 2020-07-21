var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
  if(req.cookies.recordame == undefined){
      res.render ('index',{usuario: ''});
  }else {
    res.render ('index',{usuario: req.cookies.recordame});

  }
});
router.get('/pruebaSession', function(req,res){
  if (req.session.numeroVisitas == undefined){
    req.session.numeroVisitas = 0;
  }
  req.session.numeroVisitas++;
  res.send('Session tiene numer: ' + req.session.numeroVisitas);
})

module.exports = router;

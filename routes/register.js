var express = require('express');
var router = express.Router();
let fs = require('fs');

/* GET Register. */
router.get('/', function(req, res, next) {
  res.render('register',{pageCss: 'register.css'});
});

/* GET Validation. */
router.post('/', function(req, res, next) {

    let users = fs.readFileSync('data/DBUsers.json',{encoding:'utf-8'});
    let usersJSON = JSON.parse(users);

    res.send('usuario: ' + req.body.email + ' ' +'password: ' + req.body.password);

  });

module.exports = router;
module.exports={

  list: function (req,res){
    res.send('Hola Usuario ')
    },


  create: function (req,res){
    res.render('register')
    }
}

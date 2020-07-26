module.exports={

    list: function (req,res){
      if(req.cookies.recordame == undefined){

        res.render('admin', {errors: '',usuario: ''})

      }else {
        res.render ('admin',{errors: '',usuario: req.cookies.recordame});
    
      }

      },
  
  }
  
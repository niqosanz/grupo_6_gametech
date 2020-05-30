module.exports={
    list: function (req,res){
    res.send('Algo mas.....?')
    },
    detail: function (req,res){
        res.render('productDetail')
    },

    create: function (req,res){
        res.render('productAdd')
    },
}

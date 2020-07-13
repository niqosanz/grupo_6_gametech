var db = require('../../db/models');



const controller ={
    list: function (req,res) {
        db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (productos){
            ;
            var products = [];
            for (i=0; i<productos.length ;i++){
                
                let idProduct = productos[i].id;
                let nameProduct = productos[i].short_description;
                let descriptionProduct = productos[i].long_description;
                let categorias = productos[14].category.dataValues.name;
                let detailProduct ='http://localhost:3000/api/products/'+idProduct;
                
                var newProducts = {'id':idProduct,'name':nameProduct,'description':descriptionProduct,'categories':categorias, 'detail': detailProduct}
                products.push(newProducts)

                i++

            }
            
           
   
            let respuesta ={
            
                    count: productos.length,
                    productos: products
                    
            }

            res.json(respuesta)
        },
        )
    },

}

module.exports = controller;
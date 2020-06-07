const fs = require('fs');
const path = require('path');
var multer = require ('multer')

const productsFilePath = path.join(__dirname, '../data/listadoDeProductos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const controller ={
    list: function (req,res){
    res.send(products[1].name)

    },
    detail: function (req,res){
        let productNumber = req.params.id;
        let productsImages =('/images/productos/'+products[productNumber].image);
        res.render('productDetail',{products, productNumber,productsImages})
    },

    create: function (req,res){
        res.render('productAdd')
    },
    add: function (req,res){
        let infoImg = req.files

       let proxId=  products.length +1;
       
        var newProduct = { 
       id: proxId,
       name: req.body.name,
       description: req.body.description,
       price: req.body.price,
       image: infoImg[0].filename,
       thematic: "",
        keywords: ""

     };

        products.push(newProduct)

        pasaractualizacionJSON = JSON.stringify (products)

     fs.writeFileSync('data/listadoDeProductos.json',pasaractualizacionJSON)

     res.redirect('/products/create')

        
    }
}

module.exports = controller ;
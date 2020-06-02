const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/listadoDeProductos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller ={
    list: function (req,res){
    res.send(products[1].name)
    },
    detail: function (req,res){
        let productNumber = req.params.id;
        res.render('productDetail',{products, productNumber})
    },

    create: function (req,res){
        res.render('productAdd')
    },
}

module.exports = controller ;
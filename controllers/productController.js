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
        let name = req.body.name;
        let description = req.body.description;
        let precio = req.body.price;
        var nuevoProducto={name,description,precio};
fs.appendFileSync('listadoDeProductos.json',products.push(nuevoProducto))
        res.redirect('/')
    }
}

module.exports = controller ;
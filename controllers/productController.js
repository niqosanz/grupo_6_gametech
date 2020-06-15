const fs = require('fs');
const path = require('path');
var multer = require ('multer')
var express = require('express');
var db = require('../db/models');

const productsFilePath = path.join(__dirname, '../data/listadoDeProductos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));







const controller ={
    list: function (req,res) {
        db.Product.findAll(/*{include:[{association:"brand"},{association:"category"}]}*/).then(function (resultados){
            res.send(resultados)
          },
      )},
    
    detail: function (req,res){
        let productNumber = req.params.id;
        // let productsImages =('/images/productos/'+products[1].image);
        db.Product.findByPk(req.params.id).then(function(producto){
            res.render('productDetail',{producto})
        })
        
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

        
    },
    viewedit: function (req,res) {
        let productNumber = req.params.id-1;
        let productsImages =('/images/productos/'+products[productNumber].image);
        res.render('productEdit',{products, productNumber,productsImages})

    },

    edit: function (req,res) {
    let productPosition = req.body.numberId;
    let productoAEditar = products[productPosition];

    
    
    productoAEditar.name = req.body.name;
    productoAEditar.price = req.body.price;
    productoAEditar.description = req.body.description;

    
    products.splice(productPosition,1,productoAEditar)
    
        pasaractualizacionJSON = JSON.stringify (products)
        fs.writeFileSync('data/listadoDeProductos.json',pasaractualizacionJSON)

            
        res.redirect('/')
            },

    destroy: function (req,res)   {
        delete products[req.params.id]

        pasaractualizacionJSON = JSON.stringify (products)
        fs.writeFileSync('data/listadoDeProductos.json',pasaractualizacionJSON)

            
        res.redirect('/')
         },

    adress: function (req,res) {

        db.Adress.findAll().then(function (resultados){
            console.log(resultados)
            res.send(resultados)
          },
          
      )}

}

module.exports = controller ;
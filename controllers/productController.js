const fs = require('fs');
const path = require('path');
var multer = require('multer')
var express = require('express');
var db = require('../db/models');
const { check, validationResult, body } = require('express-validator');



const controller = {
    list: function (req, res) {
        db.Product.findAll({ include: [{ association: "brand" }, { association: "category" }] },
            {
                order: [('categories_id1', 'DESC')]
            }
        ).then(function (resultados) {
            res.send(resultados)

        },
        )
    },
    detailCategories: function (req, res) {
        var parametros = req.params.id;
            db.Product.findAll(
                {
                    where:{
                        categories_id1: parametros,
                    }
                }
,{ include: [{ association: "brand" }, { association: "category" }] }
            ).then(function (resultados) {
                res.send(resultados)
   
            },
            )
        },
    

    detail: function (req, res) {
        var productNumber = req.params.id;
        db.Product.findByPk(req.params.id, { include: [{ association: "brand" }, 
        { association: "category" }] }).then(function (producto){
            db.Category.findAll().then(function(categorias){
                if(req.cookies.recordame == undefined){ 
                    res.redirect ('/login');
                }else {
                res.render ('productDetail',{usuario: req.cookies.recordame, producto,categorias});
          }
          })
        })
    },

    create: function (req, res) {
       db.Category.findAll().then(function(categorias){
                if(req.cookies.recordame == undefined){ 
                    res.redirect ('/login');
                }else {
                res.render ('productAdd',{errors: '', usuario: req.cookies.recordame,categorias});
          }
          })
    },


    // create: function (req, res) {

    //     if (req.cookies.recordame == undefined) {
    //         // res.render ('index',{usuario: ''});
    //         res.render('productAdd', { errors: '', usuario: '' })

    //     } else {
    //         res.render('productAdd', { errors: '', usuario: req.cookies.recordame });

    //     }

    // },
    add: function (req, res) {
        // let datosArchivo= req.files
        // console.log(req.body)
        let errors = validationResult(req);
        let datosArchivo = req.files[0];
        //  console.log(req.files[0].filename)


        // if(errors.isEmpty()&& (datosArchivo.mimetype=='image/jpeg' || datosArchivo.mimetype=='image/jpg' || datosArchivo.mimetype=='image/png' || datosArchivo.mimetype=='image/gif')){  db.Product.create({
        if (errors.isEmpty()) {
            db.Product.create({

                short_description: req.body.name,
                price: req.body.price,
                long_description: req.body.description,
                image:req.files[0].filename,

            })
            // console.log(req.files);

            res.redirect('/products/create',{errors: '',usuario: '',categorias})
        }
        else {
            res.render('productAdd', errors)

        }
    },

    viewedit: function (req, res) {
        if(req.cookies.recordame == undefined){ 
            res.redirect ('/login');
        }else {
        db.Product.findByPk(req.params.id).then(function (producto) {
            db.Category.findAll().then(function (categorias) {
                res.render('productEdit', {errors: '',usuario: '', producto, categorias })
            })
              })}
    },

    edit: function (req, res) {

        if(req.cookies.recordame == undefined){ 
            res.redirect ('/login');
        }else {
            db.Product.update({
                categories_id1: req.body.productCategory,
                image: req.files[0].filename,
                short_description: req.body.name,
                price: req.body.price,
                long_description: req.body.description,
            }, { where: { id: req.body.productId } })
            .then(function (result) {
                res.redirect('/admin')
            })
    
  }


    },

    destroy: function (req, res) {
        db.Product.destroy({ where: { id: req.params.id } })
            .then(function (result) {
                res.redirect('/')
            })

    },

    adress: function (req, res) {

        db.Adress.findAll().then(function (resultados) {
            console.log(resultados)
            res.send(resultados)
        },

        )
    }

}

module.exports = controller;
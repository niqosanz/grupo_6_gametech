const fs = require('fs');
const path = require('path');
var multer = require('multer')
var express = require('express');
var db = require('../db/models');
const {check,validationResult,body}=require('express-validator');



const controller ={
    list: function (req,res) {
        db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (resultados){
            res.send(resultados)
        },
        )
    },

    detail: function (req, res) {
        let productNumber = req.params.id;
        db.Product.findByPk(req.params.id,{include:[{association:"brand"},{association:"category"}]}).then(function(producto){
            res.render('productDetail',{producto})
        })

    },

    create: function (req,res){
        
        res.render('productAdd', {errors: ''})
    },
    add: function (req,res){
<<<<<<< HEAD
        console.log(req.body)
=======
        // let datosArchivo= req.files
        // console.log(req.body)
>>>>>>> 8b09478f43196f00ffef5f52bdb4d6841960a0dc
        let errors = validationResult(req);
        let datosArchivo = req.files[0];
        console.log(req.files[0])

        // if(errors.isEmpty()&& (datosArchivo.mimetype=='image/jpeg' || datosArchivo.mimetype=='image/jpg' || datosArchivo.mimetype=='image/png' || datosArchivo.mimetype=='image/gif')){  db.Product.create({
        if(errors.isEmpty()){  db.Product.create({
 
            short_description:req.body.name,
            price: req.body.price,
            long_description: req.body.description,
            // image:req.files[0].filename,

   
        })
        res.redirect('/products')   } 
        else{
            res.render('productAdd', errors)

        }
    

        

     
    },

    viewedit: function (req,res) {
        db.Product.findByPk(req.params.id).then(function(producto){
            res.render('productEdit',{producto})
        })
    },

    edit: function (req,res) {
        db.Product.update({
            short_description:req.body.name,
             price: req.body.price,
             long_description: req.body.description,
        }, {where:{id: req.body.numberId}})
        console.log(req.body.numberId)
        res.redirect('/products')
            },

    destroy: function (req,res)   {
        db.Product.destroy({where:{id: req.params.id}})
            
        res.redirect('/')
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
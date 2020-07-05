const fs = require('fs');
const path = require('path');
var multer = require('multer')
var express = require('express');
var db = require('../../db/models');
const {check,validationResult,body}=require('express-validator');



const controller ={
    list: function (req,res) {
        db.Product.findAll({include:[{association:"brand"},{association:"category"}]}).then(function (productos){
            ;let respuesta ={
               
                    count: productos.length, 
                    productos,

                
            }

            res.json(respuesta)
        },
        )
    },

}

module.exports = controller;
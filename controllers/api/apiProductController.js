var db = require('../../db/models');



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
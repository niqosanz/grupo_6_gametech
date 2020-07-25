var db = require('../../db/models');



const controller ={
    list:function(req,res){ db.User.findAll().then(function (usuarios){
        var usuario = [];
            for (i=0; i<usuarios.length ;i++){
                
                let idUsuario = usuarios[i].id;
                let userEmail = usuarios[i].email;
                let userDetail='http://localhost:3000/api/users/'+idUsuario;
                
                var newUser = {'id':idUsuario,'email':userEmail,'detail':userDetail}
                usuario.push(newUser)

            }
            let respuesta ={
            
                count: usuario.length,
                usuarios: usuario,
                
        }
        res.json(respuesta)
    },
    )
},

detail: function(req,res) {
    db.User.findByPk(req.params.id).then(function (usuario){
   
        var detalle ={
            id: usuario.id,
            email :usuario.email,
            imagen: '/Images/avatar-users/'+usuario.avatar
    }

        res.json(detalle)

    }
        
    )

}
}

module.exports = controller;
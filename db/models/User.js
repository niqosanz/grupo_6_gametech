module.exports = (sequelize, Types) =>{
    const User = sequelize.define ('User',{
        id:{type: Types.INTEGER(10).UNSIGNED,
            allowNull: false,
            autoIncrement:true,
            primaryKey: true},

        email: {type:Types.STRING(100),
             allowNull: false},

        password:{type:Types.STRING(100),
                allowNull: false},

        avatar:{type:Types.STRING(100),
                allowNull: false},

    },{
        tableName: "users",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
    // Products.associate = function(models){
    //     //hasOne, hasMany, belongsTo,belongsToMany
    //     Products.belongsTo(models.Brand,{
    //         as: "brand",
    //         foreignKey:"brands_id"
    //     })

    // }


    return User
    }
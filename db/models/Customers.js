module.exports = (sequelize, Types) =>{
    const Customer = sequelize.define ('Customer',{
        id:{type: Types.INTEGER(10).UNSIGNED
            ,
            allowNull: false,
        autoIncrement:true,
        primaryKey: true},

        birthdate:{type:Types.DATE},

        adresses_id:{type:Types.BIGINT(20).UNSIGNED,
            allowNull: false},

        users_id:{type:Types.BIGINT(20).UNSIGNED,
            allowNull: false},

       
    },{
        tableName: "customers",
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


    return Customer
    }
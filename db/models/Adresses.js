module.exports = (sequelize, Types) =>{
    const Adress = sequelize.define ('Adress',{
        id:{type: Types.INTEGER(10).UNSIGNED,
        autoIncrement:true,
        primaryKey: true},

        street:{type:Types.STRING(45)},
        number:{type:Types.STRING(45)},
        zipcode:{type:Types.STRING(45) },
        

    },{
        tableName: "addresses",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)
    return Adress
    }
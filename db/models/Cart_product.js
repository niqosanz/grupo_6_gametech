module.exports = (sequelize, Types) =>{
    const CartProduct = sequelize.define ('CartProduct',{
        id:{type: Types.BIGINT(20).UNSIGNED
            ,
            allowNull: false,
        autoIncrement:true,
        primaryKey: true},

        qty:{type:Types.BIGINT(5).UNSIGNED,
            allowNull: false,
            defaultValue: 1},

        price:{type:Types.FLOAT(9,2).UNSIGNED,
                allowNull: false,
            },



        

    },{
        tableName: "cart_product",
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })


    return CartProduct
    }
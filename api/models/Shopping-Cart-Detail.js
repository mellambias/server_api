const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ShoppingCartDetail extends Model {}
    ShoppingCartDetail.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            shoppingCartId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },
            price: {
                type: DataTypes.DECIMAL(6, 2),
                allowNull: false,
                defaultValue: 1,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                    min: 0,
                },
            },
            unitMesasure: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            vatType: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                },
            },
        },
        { sequelize, paranoid: true }
    );
    ShoppingCartDetail.associate = models => {
        // associations can be defined here
        ShoppingCartDetail.belongsTo(models.ShoppingCart, {
            foreignKey: 'shoppingCartId',
        });
        ShoppingCartDetail.belongsTo(models.Product, {
            foreignKey: 'productId',
        });
    };
    return ShoppingCartDetail;
};

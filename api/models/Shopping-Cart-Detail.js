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
            },
            price: {
                type: DataTypes.DECIMAL(6, 2),
                allowNull: false,
                defaultValue: 1,
            },
            unitMesasure: { type: DataTypes.STRING, allowNull: false },
            productName: { type: DataTypes.STRING, allowNull: false },
            vatType: { type: DataTypes.INTEGER, allowNull: false },
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

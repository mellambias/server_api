const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ShoppingCart extends Model {}
    ShoppingCart.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fingerprintId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    ShoppingCart.associate = models => {
        // associations can be defined here
        ShoppingCart.belongsTo(models.Customer, { foreignKey: 'customerId' });
        ShoppingCart.belongsTo(models.Fingerprint, {
            foreignKey: 'fingerprintId',
        });
        ShoppingCart.hasMany(models.ShoppingCartDetail, {
            foreignKey: 'shoppingCartId',
        });
        ShoppingCart.hasMany(models.Sale, { foreignKey: 'shoppingCartId' });
        ShoppingCart.hasMany(models.SaleFail, {
            foreignKey: 'shoppingCartId',
        });
    };
    return ShoppingCart;
};

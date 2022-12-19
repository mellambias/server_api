const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SaleFail extends Model {}
    SaleFail.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            paymentMethodId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: true,
            },
            shoppingCartId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: true,
            },
            errorCode: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: true,
            },

            errorMessage: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: true,
            },
        },
        { sequelize, paranoid: true }
    );
    SaleFail.associate = models => {
        // associations can be defined here
        SaleFail.belongsTo(models.PaymentMethod, {
            foreignKey: 'paymentMethodId',
        });
        SaleFail.belongsTo(models.Customer, { foreignKey: 'customerId' });
        SaleFail.belongsTo(models.ShoppingCart, {
            foreignKey: 'shoppingCartId',
        });
    };
    return SaleFail;
};

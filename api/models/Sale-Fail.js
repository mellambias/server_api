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
            },
            shoppingCartId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            errorCode: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },

            errorMessage: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
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

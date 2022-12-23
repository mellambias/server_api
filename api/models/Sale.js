const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Sale extends Model {}
    Sale.init(
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
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            paymentMethodId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            reference: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            totalPrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                },
            },
            priceBaseTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                },
            },
            priceVatTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                },
            },
            issueDate: { type: DataTypes.DATEONLY, allowNull: false },
            issueTime: { type: DataTypes.DATE, allowNull: false },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },
            price: {
                type: DataTypes.DECIMAL(6, 2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
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
                    min: 0,
                },
            },
        },
        { sequelize, paranoid: true }
    );
    Sale.associate = models => {
        // associations can be defined here
        Sale.belongsTo(models.Customer, { foreignKey: 'customerId' });
        Sale.belongsTo(models.ShoppingCart, { foreignKey: 'shoppingCartId' });
        Sale.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
        Sale.hasMany(models.SaleDetail, { foreignKey: 'saleId' });
        Sale.hasMany(models.Refund, { foreignKey: 'saleId' });
    };
    return Sale;
};

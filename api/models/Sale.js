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
            },
            totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            priceBaseTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            priceVatTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            issueDate: { type: DataTypes.DATEONLY, allowNull: false },
            issueTime: { type: DataTypes.DATE, allowNull: false },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            price: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
            unitMesasure: { type: DataTypes.STRING, allowNull: false },
            productName: { type: DataTypes.STRING, allowNull: false },
            vatType: { type: DataTypes.INTEGER, allowNull: false },
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

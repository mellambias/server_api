const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Refund extends Model {}
    Refund.init(
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
            paymentMethodId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            saleId: {
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
            issueTime: { type: DataTypes.TIME, allowNull: false },
        },
        { sequelize, paranoid: true }
    );
    Refund.associate = models => {
        // associations can be defined here
        Refund.belongsTo(models.Sale, { foreignKey: 'saleId' });
        Refund.belongsTo(models.Customer, { foreignKey: 'customerId' });
        Refund.belongsTo(models.PaymentMethod, {
            foreignKey: 'paymentMethodId',
        });
        Refund.hasMany(models.RefundDetail, { foreignKey: 'id' });
    };
    return Refund;
};

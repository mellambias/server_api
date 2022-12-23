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
                validate: {
                    notEmpty: true,
                },
            },
            paymentMethodId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            saleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            reference: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            priceBaseTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                    min: 0,
                },
            },
            priceVatTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                    min: 0,
                },
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

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RefundDetail extends Model {}
    RefundDetail.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            refundId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                },
            },
            price: {
                type: DataTypes.DECIMAL(6, 2).UNSIGNED,
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
                },
            },
        },
        { sequelize, paranoid: true }
    );
    RefundDetail.associate = models => {
        // associations can be defined here
        RefundDetail.belongsTo(models.Refund, { foreignKey: 'refundId' });
        RefundDetail.belongsTo(models.Product, { foreignKey: 'productId' });
    };
    return RefundDetail;
};

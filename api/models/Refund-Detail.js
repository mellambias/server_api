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
            RefundId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(6, 2).UNSIGNED,
                allowNull: false,
            },
            unitMesasure: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            vatType: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    RefundDetail.associate = models => {
        // associations can be defined here
        RefundDetail.belongsTo(models.Refund, { foreignKey: 'RefundId' });
        RefundDetail.belongsTo(models.Product, { foreignKey: 'productId' });
    };
    return RefundDetail;
};

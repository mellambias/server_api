const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SaleDetail extends Model {}
    SaleDetail.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            saleId: {
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
            },
            price: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
            unitMesasure: { type: DataTypes.STRING, allowNull: false },
            productName: { type: DataTypes.STRING, allowNull: false },
            vatType: { type: DataTypes.INTEGER, allowNull: false },
        },
        { sequelize, paranoid: true }
    );
    SaleDetail.associate = models => {
        // associations can be defined here
        SaleDetail.belongsTo(models.Sale, { foreignKey: 'saleId' });
        SaleDetail.belongsTo(models.Product, { foreignKey: 'productId' });
    };
    return SaleDetail;
};

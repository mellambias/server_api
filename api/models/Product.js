const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {}
    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            categoryId: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(6, 2).UNSIGNED,
            },
            taxeId: {
                type: DataTypes.INTEGER,
            },
            outstanding: {
                type: DataTypes.BOOLEAN,
            },
        },
        { sequelize, paranoid: true }
    );
    Product.associate = models => {
        // associations can be defined here
        Product.belongsTo(models.ProductsCategory, {
            foreignKey: 'categoryId',
        });
        Product.belongsTo(models.Taxe, { foreignKey: 'taxeId' });
        Product.hasMany(models.ShoppingCartDetail, {
            foreignKey: 'productId',
        });
        Product.hasMany(models.SaleDetail, { foreignKey: 'productId' });
        Product.hasMany(models.RefundDetail, { foreignKey: 'productId' });
    };
    return Product;
};

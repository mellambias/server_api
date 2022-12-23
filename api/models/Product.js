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
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            taxeId: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            price: {
                type: DataTypes.DECIMAL(6, 2).UNSIGNED,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                    min: 0,
                },
            },

            outstanding: {
                type: DataTypes.BOOLEAN,
                validate: {
                    isIn: [[true, false]],
                },
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

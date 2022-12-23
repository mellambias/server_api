const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductsCategory extends Model {}
    ProductsCategory.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        { sequelize, paranoid: true }
    );
    ProductsCategory.associate = models => {
        // associations can be defined here
        ProductsCategory.hasMany(models.Product, {
            foreignKey: 'categoryId',
        });
    };
    return ProductsCategory;
};

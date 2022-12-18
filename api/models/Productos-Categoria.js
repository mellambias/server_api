const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductosCategoria extends Model {}
    ProductosCategoria.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    ProductosCategoria.associate = models => {
        // associations can be defined here
        ProductosCategoria.hasMany(models.Producto, {
            foreignKey: 'categoriaId',
        });
    };
    return ProductosCategoria;
};

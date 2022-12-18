const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Producto extends Model {}
    Producto.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            categoriaId: {
                type: DataTypes.INTEGER,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            precio: {
                type: DataTypes.DECIMAL(6, 2).UNSIGNED,
            },
            ivaId: {
                type: DataTypes.INTEGER,
            },
            destacado: {
                type: DataTypes.BOOLEAN,
            },
        },
        { sequelize, paranoid: true }
    );
    Producto.associate = models => {
        // associations can be defined here
        Producto.belongsTo(models.ProductosCategoria, {
            foreignKey: 'categoriaId',
        });
        Producto.belongsTo(models.Iva, { foreignKey: 'ivaId' });
        Producto.hasMany(models.CarritoDetalle, { foreignKey: 'productoId' });
        Producto.hasMany(models.VentaDetalle, { foreignKey: 'productoId' });
        Producto.hasMany(models.AbonosDetalle, { foreignKey: 'productoId' });
    };
    return Producto;
};

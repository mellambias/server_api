const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CarritoDetalle extends Model {}
    CarritoDetalle.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            carritoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Carrito',
                    key: 'carritoId',
                },
            },
            productoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Producto',
                    key: 'productoId',
                },
            },
            cantidad: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            precio: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
            unidadMedida: { type: DataTypes.STRING, allowNull: false },
            nombreProducto: { type: DataTypes.STRING, allowNull: false },
            tipoIva: { type: DataTypes.INTEGER, allowNull: false },
        },
        { sequelize, paranoid: true }
    );
    CarritoDetalle.associate = models => {
        // associations can be defined here
        CarritoDetalle.belongsTo(models.Carrito, { foreignKey: 'carritoId' });
        CarritoDetalle.belongsTo(models.Producto, { foreignKey: 'productoId' });
    };
    return CarritoDetalle;
};

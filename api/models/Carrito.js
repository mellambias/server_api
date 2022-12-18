const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Carrito extends Model {}
    Carrito.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            clienteId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fingerprintId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    Carrito.associate = models => {
        // associations can be defined here
        Carrito.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
        Carrito.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
        Carrito.hasMany(models.CarritoDetalle, { foreignKey: 'carritoId' });
        Carrito.hasMany(models.Venta, { foreignKey: 'carritoId' });
        Carrito.hasMany(models.ErroresVenta, { foreignKey: 'carritoId' });
    };
    return Carrito;
};

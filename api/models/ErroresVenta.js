const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ErroresVenta extends Model {}
    ErroresVenta.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            metodoPagoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            clienteId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: true,
            },
            carritoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: true,
            },
            codigoError: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: true,
            },
            mensajeError: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: true,
            },
        },
        { sequelize, paranoid: true }
    );
    ErroresVenta.associate = models => {
        // associations can be defined here
        ErroresVenta.belongsTo(models.MetodosPago, {
            foreignKey: 'metodoPagoId',
        });
        ErroresVenta.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
        ErroresVenta.belongsTo(models.Carrito, { foreignKey: 'carritoId' });
    };
    return ErroresVenta;
};
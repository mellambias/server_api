const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Venta extends Model {}
    Venta.init(
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
            clienteId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Cliente',
                    key: 'clienteId',
                },
            },
            metodoPagoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'MetodosPago',
                    key: 'metodoPagoId',
                },
            },
            referencia: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            precioTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            precioBaseTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            precioIvaTotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            fechaEmision: { type: DataTypes.DATEONLY, allowNull: false },
            horaEmision: { type: DataTypes.DATE, allowNull: false },
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
    Venta.associate = models => {
        // associations can be defined here
        Venta.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
        Venta.belongsTo(models.Carrito, { foreignKey: 'carritoId' });
        Venta.belongsTo(models.MetodosPago, { foreignKey: 'metodoPagoId' });
        Venta.hasMany(models.VentaDetalle, { foreignKey: 'ventaId' });
        Venta.hasMany(models.Abono, { foreignKey: 'ventaId' });
    };
    return Venta;
};

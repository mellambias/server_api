const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VentaDetalle extends Model {}
    VentaDetalle.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            ventaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
    VentaDetalle.associate = models => {
        // associations can be defined here
        VentaDetalle.belongsTo(models.Venta, { foreignKey: 'ventaId' });
        VentaDetalle.belongsTo(models.Producto, { foreignKey: 'productoId' });
    };
    return VentaDetalle;
};

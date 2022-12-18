const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Abono extends Model {}
    Abono.init(
        {
            abonoId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            clienteId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            metodoPagoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ventaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
        },
        { sequelize, paranoid: true }
    );
    Abono.associate = models => {
        // associations can be defined here
        Abono.belongsTo(models.Venta, { foreignKey: 'ventaId' });
        Abono.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
        Abono.belongsTo(models.MetodosPago, { foreignKey: 'metodoPagoId' });
        Abono.hasMany(models.AbonosDetalle, { foreignKey: 'abonoId' });
    };
    return Abono;
};

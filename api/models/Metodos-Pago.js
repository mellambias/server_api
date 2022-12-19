const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MetodosPago extends Model {}
    MetodosPago.init(
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
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    MetodosPago.associate = models => {
        // associations can be defined here
        MetodosPago.hasMany(models.Venta, { foreignKey: 'metodoPagoId' });
        MetodosPago.hasMany(models.ErroresVenta, {
            foreignKey: 'metodoPagoId',
        });
        MetodosPago.hasMany(models.Abono, {
            foreignKey: 'metodoPagoId',
        });
    };
    return MetodosPago;
};

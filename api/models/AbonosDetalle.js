const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AbonosDetalle extends Model {}
    AbonosDetalle.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            abonoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            precio: {
                type: DataTypes.DECIMAL(6, 2).UNSIGNED,
                allowNull: false,
            },
            unidadMedida: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nombreProducto: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tipoIva: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    AbonosDetalle.associate = models => {
        // associations can be defined here
        AbonosDetalle.belongsTo(models.Abono, { foreignKey: 'abonoId' });
        AbonosDetalle.belongsTo(models.Producto, { foreignKey: 'productoId' });
    };
    return AbonosDetalle;
};

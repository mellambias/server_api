const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Iva extends Model {}
    Iva.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            tipo: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            vigente: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        { sequelize, paranoid: true }
    );
    Iva.associate = models => {
        // associations can be defined here
        Iva.hasMany(models.Producto, { foreignKey: 'ivaId' });
    };
    return Iva;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Fingerprint extends Model {}
    Fingerprint.init(
        {
            fingerprintId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fingerprint: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    Fingerprint.associate = models => {
        // associations can be defined here
        Fingerprint.hasMany(models.Carrito, { foreignKey: 'fingerprintId' });
        Fingerprint.belongsTo(models.Cliente, { foreignKey: 'clientId' });
        Fingerprint.hasOne(models.Contacto, { foreignKey: 'fingerprintId' });
    };
    return Fingerprint;
};

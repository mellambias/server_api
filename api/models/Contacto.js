const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Contacto extends Model {}
    Contacto.init(
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
            apellidos: { type: DataTypes.STRING, allowNull: false },
            telefono: { type: DataTypes.STRING(20), allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            mensaje: { type: DataTypes.TEXT, allowNull: false },
            fingerprintId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Fingerprint',
                    key: 'fingerprintId',
                },
            },
        },
        { sequelize, paranoid: true }
    );
    Contacto.associate = models => {
        // associations can be defined here
        Contacto.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
    };
    return Contacto;
};

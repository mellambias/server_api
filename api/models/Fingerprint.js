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
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            fingerprint: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        { sequelize, paranoid: true }
    );
    Fingerprint.associate = models => {
        // associations can be defined here
        Fingerprint.hasMany(models.ShoppingCart, {
            foreignKey: 'fingerprintId',
        });
        Fingerprint.belongsTo(models.Customer, { foreignKey: 'customerId' });
        Fingerprint.hasOne(models.Contact, { foreignKey: 'fingerprintId' });
    };
    return Fingerprint;
};

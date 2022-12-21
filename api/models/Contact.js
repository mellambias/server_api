const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {}
    Contact.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            surnames: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isMobilePhone: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            message: { type: DataTypes.TEXT, allowNull: false },
            fingerprintId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        { sequelize, paranoid: true }
    );
    Contact.associate = models => {
        // associations can be defined here
        Contact.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
    };
    return Contact;
};

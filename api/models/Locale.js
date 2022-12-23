const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Locale extends Model {}
    Locale.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            languageAlias: {
                type: DataTypes.STRING(2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            entity: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            entityKey: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                },
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            value: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        { sequelize, paranoid: true }
    );
    Locale.associate = models => {
        // associations can be defined here
    };
    return Locale;
};

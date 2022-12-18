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
            },
            entity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            entityKey: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    Locale.associate = models => {
        // associations can be defined here
    };
    return Locale;
};

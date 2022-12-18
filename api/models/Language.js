const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Language extends Model {}
    Language.init(
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
            },
            alias: {
                type: DataTypes.STRING(2),
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    Language.associate = models => {
        // associations can be defined here
    };
    return Language;
};

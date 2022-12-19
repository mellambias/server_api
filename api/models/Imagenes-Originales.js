const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ImagenesOriginales extends Model {}
    ImagenesOriginales.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            entity: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            languageAlias: {
                type: DataTypes.STRING(2),
                allowNull: false,
            },
            filename: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mimeType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sizeBytes: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            widthPx: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            heightPx: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    ImagenesOriginales.associate = models => {
        // associations can be defined here
    };
    return ImagenesOriginales;
};

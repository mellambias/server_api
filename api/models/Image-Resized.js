const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ImageResized extends Model {}
    ImageResized.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            imageOriginalId: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            imageConfigurationId: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            alt: {
                type: DataTypes.STRING,
                allowNull: false,
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
            grid: {
                type: DataTypes.ENUM,
                values: ['desktop', 'mobile', 'preview'],
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
            quality: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    ImageResized.associate = models => {
        // associations can be defined here
    };
    return ImageResized;
};

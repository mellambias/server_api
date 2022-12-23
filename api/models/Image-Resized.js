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
                type: DataTypes.INTEGER,
            },
            imageConfigurationId: {
                type: DataTypes.INTEGER,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            alt: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isUrl: true,
                },
            },
            entity: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            languageAlias: {
                type: DataTypes.STRING(2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            filename: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            mimeType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isMimeType: true,
                },
            },
            grid: {
                type: DataTypes.ENUM,
                values: ['desktop', 'mobile', 'preview'],
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isIn: [['desktop', 'mobile', 'preview']],
                },
            },
            sizeBytes: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },
            widthPx: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },
            heightPx: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },
            quality: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },
        },
        { sequelize, paranoid: true }
    );
    ImageResized.associate = models => {
        // associations can be defined here
    };
    return ImageResized;
};

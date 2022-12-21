const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ImageSetting extends Model {}
    ImageSetting.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            entity: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            directory: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            type: {
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
            grid: {
                type: DataTypes.ENUM,
                values: ['desktop', 'mobile', 'preview'],
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isIn: [['desktop', 'mobile', 'preview']],
                },
            },
            contentAccepted: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            extensionConversion: {
                type: DataTypes.STRING(4),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            widthPx: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },
            heightPx: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                    min: 0,
                },
            },
            quality: {
                type: DataTypes.INTEGER,
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
    ImageSetting.associate = models => {
        // associations can be defined here
    };
    return ImageSetting;
};

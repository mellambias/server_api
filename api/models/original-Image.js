const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OriginalImage extends Model {}
    OriginalImage.init(
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
                validate: {
                    notEmpty: true,
                    isURL: true,
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
                validate: {
                    notEmpty: true,
                    isInt: true,
                },
            },
            languageAlias: {
                type: DataTypes.STRING(2),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [0, 2],
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
        },
        { sequelize, paranoid: true }
    );
    OriginalImage.associate = models => {
        // associations can be defined here
    };
    return OriginalImage;
};

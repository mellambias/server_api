const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {}
    Image.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            originalFilename: {
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
            resizedFilename: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            htmlElementId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            mediaQuery: {
                type: DataTypes.ENUM,
                values: ['desktop', 'mobile', 'thumbnail'],
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isIn: [['desktop', 'mobile', 'thumbnail']],
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
            latency: {
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
    Image.associate = models => {
        // associations can be defined here
        Image.hasOne(models.ImageConfigurations, { foreignKey: 'id' });
    };
    return Image;
};

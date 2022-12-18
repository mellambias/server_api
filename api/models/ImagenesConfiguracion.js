const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ImagenesConfiguracion extends Model {}
    ImagenesConfiguracion.init(
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
            },
            directory: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            grid: {
                type: DataTypes.ENUM,
                values: ['desktop', 'mobile', 'preview'],
                allowNull: false,
            },
            contentAccepted: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            extensionConversion: {
                type: DataTypes.STRING(4),
                allowNull: false,
            },
            widthPx: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            heightPx: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quality: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    ImagenesConfiguracion.associate = models => {
        // associations can be defined here
    };
    return ImagenesConfiguracion;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ImageConfigurations extends Model {}
    ImageConfigurations.init(
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
            mediaQuery: {
                type: DataTypes.ENUM,
                values: ['desktop', 'mobile', 'thumbnail'],
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isIn: [['desktop', 'mobile', 'thumbnail']],
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
    ImageConfigurations.associate = models => {
        // associations can be defined here
        ImageConfigurations.belongsTo(models.Image, { foreignKey: 'id' });
    };
    return ImageConfigurations;
};

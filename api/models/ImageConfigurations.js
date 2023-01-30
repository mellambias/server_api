const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ImageConfigurations extends Model {}
    ImageConfigurations.init(
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            entity: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            mediaQuery: {
                type: DataTypes.STRING(255),
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
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: 'image_configurations',
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
            ],
        }
    );
    ImageConfigurations.associate = models => {
        // associations can be defined here
        ImageConfigurations.hasMany(models.Image, {
            as: 'images',
            foreignKey: 'imageConfigurationId',
        });
    };
    return ImageConfigurations;
};

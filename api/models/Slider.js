const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Slider extends Model {}
    Slider.init(
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
        },
        { sequelize, paranoid: true }
    );
    Slider.associate = models => {
        // associations can be defined here
    };
    return Slider;
};

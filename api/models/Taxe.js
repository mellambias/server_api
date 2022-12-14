const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Taxe extends Model {}
    Taxe.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isInt: true,
                },
            },
            valid: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                validate: {
                    notEmpty: true,
                    isIn: [[true, false]],
                },
            },
        },
        { sequelize, paranoid: true }
    );
    Taxe.associate = models => {
        // associations can be defined here
    };
    return Taxe;
};

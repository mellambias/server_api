const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Email extends Model {}
    Email.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            from: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            to: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            isSendOk: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            error: {
                type: DataTypes.TEXT,
            },
        },
        { sequelize, paranoid: true }
    );
    return Email;
};

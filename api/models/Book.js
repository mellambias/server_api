const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {}
    Book.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            isbn: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            pageCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true,
                },
            },
            publishedDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    Book.associate = models => {
        // associations can be defined here
    };
    return Book;
};

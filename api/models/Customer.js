const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {}
    Customer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            shoppingCartId: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            surnames: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isMobilePhone: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isEmail: true,
                },
            },
            town: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            postalCode: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            address: { type: DataTypes.STRING, allowNull: false },
        },
        { sequelize, paranoid: true }
    );
    Customer.associate = models => {
        // associations can be defined here
        Customer.hasMany(models.ShoppingCart, {
            foreignKey: 'customerId',
            allowNull: false,
        });
        Customer.hasOne(models.Fingerprint, { foreignKey: 'customerId' });
        Customer.hasMany(models.Sale, { foreignKey: 'customerId' });
        Customer.hasMany(models.SaleFail, { foreignKey: 'customerId' });
        Customer.hasMany(models.Refund, { foreignKey: 'customerId' });
    };
    return Customer;
};

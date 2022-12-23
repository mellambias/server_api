const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PaymentMethod extends Model {}
    PaymentMethod.init(
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
                validate: {
                    notEmpty: true,
                },
            },
            visible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isIn: [[true, false]],
                },
            },
        },
        { sequelize, paranoid: true }
    );
    PaymentMethod.associate = models => {
        // associations can be defined here
        PaymentMethod.hasMany(models.Sale, { foreignKey: 'paymentMethodId' });
        PaymentMethod.hasMany(models.SaleFail, {
            foreignKey: 'paymentMethodId',
        });
        PaymentMethod.hasMany(models.Refund, {
            foreignKey: 'paymentMethodId',
        });
    };
    return PaymentMethod;
};

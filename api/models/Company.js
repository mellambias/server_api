const {
    Model,
    ValidationError,
    ValidationErrorItem,
    HostNotReachableError,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Company extends Model {}
    Company.init(
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
            phone: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isMobilePhone: true,
                },
            },
            mobile: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isMobilePhone: true,
                },
            },
            nif: {
                type: DataTypes.STRING(20),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isNif(value) {
                        if (!value.match(/^[0-9]{8}[A-Z]$/)) {
                            let errorItem;
                            if (value.length !== 9) {
                                errorItem = new ValidationErrorItem(
                                    'invalid long NIF',
                                    'FUNCTION',
                                    'nif',
                                    value,
                                    Company,
                                    'isNifLong',
                                    'fnName',
                                    [9]
                                );
                            } else {
                                errorItem = new ValidationErrorItem(
                                    'invalid NIF',
                                    'FUNCTION',
                                    'nif',
                                    value,
                                    Company,
                                    'isNif',
                                    'fnName',
                                    []
                                );
                            }
                            throw new ValidationError('Invalid NIF', [
                                errorItem,
                            ]);
                        }
                    },
                },
            },
            OpeningSchedule: {
                type: DataTypes.TIME,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isTime(value) {
                        let timeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
                        if (!timeFormat.test(value)) {
                            let errorItem = new ValidationErrorItem(
                                'Invalid closing time',
                                'FUNCTION',
                                'ClosingSchedule',
                                value,
                                Company,
                                'isTime',
                                'fnName',
                                ['00:00', '23:59']
                            );
                            throw new ValidationError('Invalid time format', [
                                errorItem,
                            ]);
                        }
                    },
                },
            },
            ClosingSchedule: {
                type: DataTypes.TIME,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isTime(value) {
                        let timeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
                        if (!timeFormat.test(value)) {
                            let errorItem = new ValidationErrorItem(
                                'Invalid closing time',
                                'FUNCTION',
                                'ClosingSchedule',
                                value,
                                Company,
                                'isTime',
                                'fnName',
                                [value]
                            );
                            throw new ValidationError('Invalid time format', [
                                errorItem,
                            ]);
                        }
                    },
                },
            },
        },
        { sequelize, paranoid: true }
    );
    Company.associate = models => {
        // associations can be defined here
    };
    return Company;
};

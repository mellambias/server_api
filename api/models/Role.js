const {
    Model,
    ValidationError,
    ValidationErrorItem,
    HostNotReachableError,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {}
    Role.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            roleName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                },
            },
            roleNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                validate: {
                    isInt: true,
                    min: 0,
                },
            },
        },
        { sequelize, paranoid: true }
    );
    Role.associate = models => {
        // associations can be defined here
        Role.hasMany(models.UserRole, { foreignKey: 'roleId' });
        Role.belongsToMany(models.User, {
            through: 'UserRole',
            foreignKey: 'roleId',
        });
    };
    return Role;
};

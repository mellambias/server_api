const {
    Model,
    ValidationError,
    ValidationErrorItem,
    HostNotReachableError,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {}
    UserRole.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { sequelize, paranoid: true }
    );
    UserRole.associate = models => {
        // associations can be defined here
        UserRole.belongsTo(models.User, { foreignKey: 'userId' });
        UserRole.belongsTo(models.Role, { foreignKey: 'roleId' });
    };
    return UserRole;
};

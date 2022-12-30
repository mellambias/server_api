const {
    Model,
    ValidationError,
    ValidationErrorItem,
    HostNotReachableError,
} = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
            },
            refreshToken: {
                type: DataTypes.STRING,
            },
        },
        { sequelize, paranoid: true }
    );
    User.associate = models => {
        // associations can be defined here
        User.hasMany(models.UserRole, { foreignKey: 'userId' });
        User.belongsToMany(models.Role, {
            through: models.UserRole,
            foreignKey: 'userId',
        });
    };
    useBcrypt(User, { field: 'password', rounds: 12, compare: 'authenticate' });
    return User;
};

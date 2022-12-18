const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cliente extends Model {}
    Cliente.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            carritoId: { type: DataTypes.INTEGER },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            apellidos: { type: DataTypes.STRING, allowNull: false },
            telefono: { type: DataTypes.STRING(20), allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            poblacion: { type: DataTypes.STRING, allowNull: false },
            codigoPostal: { type: DataTypes.STRING, allowNull: false },
            direccion: { type: DataTypes.STRING, allowNull: false },
        },
        { sequelize, paranoid: true }
    );
    Cliente.associate = models => {
        // associations can be defined here
        Cliente.hasMany(models.Carrito, {
            foreignKey: 'clienteId',
            allowNull: false,
        });
        Cliente.hasOne(models.Fingerprint, { foreignKey: 'clientId' });
        Cliente.hasMany(models.Venta, { foreignKey: 'clienteId' });
        Cliente.hasMany(models.ErroresVenta, { foreignKey: 'clienteId' });
        Cliente.hasMany(models.Abono, { foreignKey: 'clienteId' });
    };
    return Cliente;
};

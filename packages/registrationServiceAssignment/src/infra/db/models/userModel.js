module.exports = (sequelize, DataTypes) => {
    const attributes = {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,

        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }

    const options = {
        defaultScope: {
            attributes: { exclude: ['hashedPassword'] },
        },
            scopes: {
                withPassword: { attributes: {}, }
            }
    };

    const User = sequelize.define('User', attributes, options);
    return User;
};
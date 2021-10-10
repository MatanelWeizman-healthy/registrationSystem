module.exports = (sequelize, DataTypes) => {
    const attributes = {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,

        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }

    const Message = sequelize.define('Message', attributes);
    return Message;
};
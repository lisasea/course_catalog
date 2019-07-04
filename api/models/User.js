"use strict";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },  
        lastName: {
            type: DataTypes.STRING,
        },
        emailAddress: {
            type: DataTypes.STRING,
        }, 
        password: {
            type: DataTypes.STRING,
        }
    });

    User.associate = function(models) {
        models.User.hasMany(models.Course);
    };

    return User;
};
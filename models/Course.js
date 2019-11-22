"use strict";

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Title required"
                }
            }
        },
       description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Course description required"
                }
            }
        }, 
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Course.associate = function(models) {
        models.Course.belongsTo(models.User, { foreignKey: "userId" });
    };

    return Course;
};
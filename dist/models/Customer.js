"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Customer extends sequelize_1.Model {
    static associate(models) { }
}
exports.default = (sequelize) => {
    Customer.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        contactNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: true,
        },
        addedBy: sequelize_1.DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "Customer",
        tableName: "Customers",
        timestamps: false,
    });
    return Customer;
};

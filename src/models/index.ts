import { Sequelize } from "sequelize";
import User from "./User";
import Customer from "./Customer";
import Role from "./Role";
import Medication from "./Medication";

const sequelize = new Sequelize(process.env.MYSQL_DB || "wire", process.env.MYSQL_USER || "root", process.env.MYSQL_USER_PASSWORD || "root", {
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_USER_PASSWORD || "root",
  database: process.env.MYSQL_DB || "wire",
  host: process.env.MYSQL_DB_HOST || "api-mysql",
  dialect: "mysql",
  logging: false,
});

const models = {
  User: User(sequelize),
  Role: Role(sequelize),
  Customer: Customer(sequelize),
  Medication: Medication(sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

export { models };

import { Sequelize } from "sequelize";
import User from "./User";
import Customer from "./Customer";
import Role from "./Role";
import Medication from "./Medication";

const sequelize = new Sequelize("wire", "root", "root", {
  username: "root",
  password: "root",
  database: "wire",
  host: "api-mysql",
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

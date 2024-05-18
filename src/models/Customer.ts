import { Model, DataTypes, Sequelize } from "sequelize";

interface CustomerAttributes {
  id: number;
  firstName: string | null;
  lastName: string | null;
  contactNumber: string | null;
  active: boolean | null;
  addedBy: number | null;
}

class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public id!: number;
  public firstName!: string | null;
  public lastName!: string | null;
  public contactNumber!: string | null;
  public active!: boolean | null;
  public addedBy!: number | null;

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      addedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "Customers",
      timestamps: false,
    }
  );
  return Customer;
};

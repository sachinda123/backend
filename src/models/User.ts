import { Model, DataTypes, Sequelize } from "sequelize";
// import { Role } from "./Role"; // Assuming you have a Role model defined

interface UserAttributes {
  id: number;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  password: string | null;
  RoleId: number | null;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string | null;
  public lastName!: string | null;
  public userName!: string | null;
  public password!: string | null;
  public RoleId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // If you have associations defined, you can define them here
  // public readonly role?: Role;

  // Here you can define class level methods

  // Here you can define associations

  static associate(models: any) {
    // User.belongsTo(models.Role, { foreignKey: "RoleId" });
  }
}

export default (sequelize: Sequelize) => {
  User.init(
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
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: false,
    }
  );

  return User;
};

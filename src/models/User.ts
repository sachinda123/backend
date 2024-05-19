import { Model, DataTypes, Sequelize } from "sequelize";
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
  static associate(models: any) {}
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

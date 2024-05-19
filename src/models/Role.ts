import { Model, DataTypes, Sequelize } from "sequelize";

interface RoleAttributes {
  id: number;
  role: string | null;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public role!: string | null;
  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "Roles",
      timestamps: false,
    }
  );

  return Role;
};

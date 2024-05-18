import { Model, DataTypes, Sequelize } from "sequelize";

interface RoleAttributes {
  id: number;
  role: string | null;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public role!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // If you have associations defined, you can define them here
  // public readonly role?: Role;

  // Here you can define class level methods

  // Here you can define associations

  static associate(models: any) {
    // Role.belongsTo(models.Role, { foreignKey: "RoleId" });
  }
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

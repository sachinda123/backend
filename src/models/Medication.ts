import { Model, DataTypes, Sequelize } from "sequelize";

interface MedicationAttributes {
  id: number;
  name: string;
  description: string | null;
  quantity: string | null;
  active: boolean | null;
  addedBy: number | null;
}

class Medication extends Model<MedicationAttributes> implements MedicationAttributes {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public quantity!: string | null;
  public active!: boolean | null;
  public addedBy!: number | null;

  static associate(models: any) {}
}

export default (sequelize: Sequelize) => {
  Medication.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      addedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Medication",
      tableName: "Medications",
      timestamps: false,
    }
  );
  return Medication;
};

const Sequelize = require("sequelize");
class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
            },
            age: {
                type: DataTypes.STRING,
            },
            sex: {
                type: DataTypes.STRING,
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            birthDay: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: false
            },
        },
      {
        modelName: "User",
        sequelize
      }
    );
  }
}

module.exports = new User();

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    username:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.AuthToken);
  };
  return user;
};
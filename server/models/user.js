
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
    },
  });
  user.associate = function({AuthToken}) {
    // associations can be defined here
    user.hasMany(AuthToken);
  };
  user.authenticate = async function (username, password){
    const user = await user.findOne({ where: { username }});
    if(bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }
    throw new Error('invalid password');
  }
  user.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this
    const authToken = await AuthToken.generate(this.id);
    await user.addAuthToken(authToken);
    return { user, authToken }
  };
  user.prototype.logout = async function (token) {
    sequelize.models.AuthToken.destroy({ where: { token }});
  };
  return user;
};
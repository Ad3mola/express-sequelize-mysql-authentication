
module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  AuthToken.associate = function({user}) {
    // associations can be defined here
    AuthToken.belongsTo(user);
  };
  AuthToken.generate = async function(userId){
    if(!userId){
      throw new error('AuthToken requires a use ID')
    }
    let token = '';
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i <15; i++){
      token += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }
    return AuthToken.create({ token, userId})
  }
  return AuthToken;
};
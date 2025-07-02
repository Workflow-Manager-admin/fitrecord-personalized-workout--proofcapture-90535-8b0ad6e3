//
// Sequelize models for user, profile, workout, and workout proof upload.
//
const { Sequelize, DataTypes, Model } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite')
});

// User model: for auth (basic info)
class User extends Model {}
User.init({
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { len: [4, 40] }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'User',
});

// Profile model: stores weight/height for user
class Profile extends Model {}
Profile.init({
  weight: { type: DataTypes.FLOAT, allowNull: false }, // in kg
  height: { type: DataTypes.FLOAT, allowNull: false }, // in cm
}, {
  sequelize,
  modelName: 'Profile',
});

// WorkoutSession: single exercise instance with a proof file, optional
class WorkoutSession extends Model {}
WorkoutSession.init({
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  exercise: {
    type: DataTypes.STRING,
    allowNull: false
  },
  proofFile: {
    type: DataTypes.STRING, // path to file
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'WorkoutSession',
});

User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(WorkoutSession, { foreignKey: 'userId', onDelete: 'CASCADE' });
WorkoutSession.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Profile,
  WorkoutSession
};

// Sequelize models for user, profile, workout, and file upload (proof)
const { Sequelize, DataTypes, Model } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false
});

// User model (username/password for login)
class User extends Model {}
User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [3, 40] }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'User' });

// Profile (weight/height), one-to-one per User
class Profile extends Model {}
Profile.init({
  weight: { type: DataTypes.FLOAT, allowNull: false },
  height: { type: DataTypes.FLOAT, allowNull: false }
}, { sequelize, modelName: 'Profile' });

// WorkoutSession (logs with optional proof file)
class WorkoutSession extends Model {}
WorkoutSession.init({
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  exercise: { type: DataTypes.STRING, allowNull: false },
  proofFile: { type: DataTypes.STRING, allowNull: true }
}, { sequelize, modelName: 'WorkoutSession' });

// Relationships
User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(WorkoutSession, { foreignKey: 'userId', onDelete: 'CASCADE' });
WorkoutSession.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize, User, Profile, WorkoutSession
};

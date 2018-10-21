const sequelize = require('./conn');

const Abbrev = require('./models/abbrev');
const AbbrevMicro = require('./models/abbrev-micro');
const Day = require('./models/day');
const FoodDesc = require('./models/food-des');
const Weight = require('./models/weight');
const FoodRecord = require('./models/food-record');
const User = require('./models/user');
const UserMeasurement = require('./models/user-measurements');
const MealGoals = require('./models/meal-goals');
const FoodGroup = require('./models/food-group');
const Meal = require('./models/meal');
const Program = require('./models/program');
const Preferences = require('./models/preferences');
const UserRecordFavorites = require('./models/user-record-favorites');
const {
  ABBREV,
  USER,
  FOOD_GROUP
} = require('./foreignKeys');

const abbrevId = { foreignKey: ABBREV };
const userId = { foreignKey: USER };
const FdGrpCd = { foreignKey: FOOD_GROUP };

const throughUserRecordFavorites = { through: UserRecordFavorites };

AbbrevMicro.belongsTo(Abbrev, abbrevId);
Abbrev.hasOne(AbbrevMicro, abbrevId);

FoodDesc.belongsTo(Abbrev, abbrevId);
Abbrev.hasOne(FoodDesc, abbrevId);

FoodDesc.belongsTo(FoodGroup, FdGrpCd);
FoodGroup.hasMany(FoodDesc, FdGrpCd);

FoodRecord.belongsTo(Meal);
Meal.hasMany(FoodRecord);

FoodRecord.belongsTo(Abbrev, abbrevId);
Abbrev.hasMany(FoodRecord, abbrevId);

FoodRecord.belongsTo(User, userId);
User.hasMany(FoodRecord, userId);

Meal.belongsTo(User, userId);
User.hasMany(Meal, userId);

MealGoals.belongsTo(User, userId);
User.hasMany(MealGoals, userId);

Day.belongsTo(User, userId);
User.hasMany(Day, userId);

Program.belongsTo(User, userId);
User.hasMany(Program, userId);

Preferences.belongsTo(User, userId);
User.hasOne(Preferences, userId);

User.belongsToMany(Abbrev, throughUserRecordFavorites);
Abbrev.belongsToMany(User, throughUserRecordFavorites);

UserMeasurement.belongsTo(User, userId);
User.hasMany(UserMeasurement, userId);

Weight.belongsTo(Abbrev, abbrevId);
Abbrev.hasMany(Weight, abbrevId);

module.exports = {
  sequelize,
  Abbrev,
  AbbrevMicro,
  Day,
  FoodDesc,
  Weight,
  FoodRecord,
  Meal,
  User,
  UserMeasurement,
  UserFavorites: UserRecordFavorites,
  Preferences,
  Program,
  MealGoals,
  FoodGroup
};


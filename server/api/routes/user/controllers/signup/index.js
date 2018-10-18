const { handleRouteError } = include('utils/handleRouteError');
const AppError = include('configure/appError');
const { sequelize, User, UserMeasurement, Program } = include('db');
const moment = require('moment');
const jwt = require('jwt-simple');
const { bodySchema, userMeasurementsSchema } = require('./validation');

const signup = async (req, res, next) => {
  let transaction;
  try {
    await bodySchema.validate(req.body);

    const data = req.body;
    const params = [
      'gender',
      'height',
      'weight',
      'units',
      'lifestyle',
      'goal'
    ];

    const hasMeasurements = params.reduce((memo, param) => {
      return memo && data.userMeasurements && data.userMeasurements[param];
    }, true);

    if (hasMeasurements) {
      try {
        await userMeasurementsSchema.validate(data.userMeasurements);

        const programObj = Program.makeProgramObject({
          ...req.body,
          ...data.userMeasurements
        });
        delete programObj.user_id;

        transaction = await sequelize.transaction();

        // Create the user
        const user = await User.create({
          ...req.body,
          ...data.userMeasurements
        }, { transaction });

        const age = moment().diff(data.birthdate, 'years');

        // Create the measurements
        const measurement = await UserMeasurement.create({
          ...data.userMeasurements,
          age
        }, { transaction });

        // Create the program
        const program = await Program.create(programObj, { transaction });

        // Associate measurements and program
        await user.addUserMeasurement(measurement, { transaction });
        await user.addProgram(program, { transaction });

        await transaction.commit();

        // Get the user with measurements, goals, and programs
        const userFull = await User.scope(
          'measurements',
          'meal-goals',
          'programs'
        ).findById(user.id);

        const token = jwt.encode({
          id: user.id
        }, res.locals.jwtSecret);

        res
          .status(201)
          .set({ token })
          .json(userFull);
      } catch (err) {
        throw new AppError(400, {
          usermessage: 'This email is already taken',
          devmessage: err.message
        }, true);
      }
    } else {
      try {
        const user = await User.create(req.body);
        const token = jwt.encode({
          id: user.id
        }, res.locals.jwtSecret);
        res.status(201).set({ token }).json(user);
      } catch (err) {
        throw new AppError(400, {
          usermessage: 'This email is already taken',
          devmessage: err.message
        }, true);
      }
    }
  } catch (err) {
    if (transaction) {
      transaction.rollback();
    }
    handleRouteError(err, 'Couldn\'t create an account');
    next(err);
  }
};

module.exports = signup;

const chalk = require('chalk');
const { handleRouteError } = include('utils/handleRouteError');
const AppError = include('configure/appError');
const {
  sequelize,
  User,
  UserMeasurement,
  Program
} = include('db');
const { USER } = include('db/foreignKeys');
const moment = require('moment');
const jwt = require('jwt-simple');
const {
  bodySchema,
  userMeasurementsSchema
} = require('./validation');

const signup = async (req, res, next) => {
  let transaction;
  try {
    await bodySchema.validate(req.body);

    const params = [
      'gender',
      'height',
      'weight',
      'units',
      'lifestyle',
      'goal'
    ];

    const { body } = req;
    const { userMeasurements, birthdate } = body;

    const hasMeasurements = params.reduce((memo, param) => {
      return memo && userMeasurements && userMeasurements[param];
    }, true);

    if (hasMeasurements) {
      try {
        await userMeasurementsSchema.validate(userMeasurements);

        const config = {
          ...body,
          ...userMeasurements
        };
        
        
        const programObj = Program.makeProgramObject(config);

        delete programObj[USER];

        const age = moment().diff(birthdate, 'years');
        transaction = await sequelize.transaction();

        const [user, measurement, program] = await Promise.all([
          User.create(config, { transaction }),
          UserMeasurement.create({
            ...userMeasurements,
            age
          }, { transaction }),
          Program.create(programObj, { transaction })
        ]);

        // Associate measurements and program
        await Promise.all([
          user.addUserMeasurement(measurement, { transaction }),
          user.addProgram(program, { transaction })
        ]);

        await transaction.commit();

        // Get the user with measurements, goals, and programs
        const userFull = await User.scope(
          'measurements',
          'meal-goals',
          'programs'
        ).findById(user.uuid);

        console.log(chalk.yellow.inverse('user.uuid'), user.uuid);
        console.log(chalk.yellow.inverse('user.id'), user.id);

        const token = jwt.encode({
          id: user.id,
          uuid: user.uuid
        }, res.locals.jwtSecret);

        res
          .status(201)
          .set('token', token)
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
          id: user.id,
          uuid: user.uuid
        }, res.locals.jwtSecret);

        res
          .status(201)
          .set('token', token)
          .json(user);
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

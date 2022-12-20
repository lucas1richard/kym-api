const AppError = include('configure/appError');
const { connectDatabase, foreignKeys, UserApi } = require('@kym/db');
const moment = require('moment');
const jwt = require('jwt-simple');
const { bodySchema, userMeasurementsSchema } = require('./validation');

const {
  sequelize,
  User,
  UserMeasurement,
  Program,
} = connectDatabase();

const signupV1 = async ({ jwtSecret, data }) => {
  let transaction;
  try {
    await bodySchema.validate(data);

    const params = [
      'gender',
      'height',
      'weight',
      'units',
      'lifestyle',
      'goal',
    ];

    const { userMeasurements, birthdate } = data;

    const hasMeasurements = params.every((param) => userMeasurements?.[param]);

    if (hasMeasurements) {
      try {
        await userMeasurementsSchema.validate(userMeasurements);

        const config = {
          ...data,
          ...userMeasurements,
        };

        const programObj = Program.makeProgramObject(config);

        delete programObj[foreignKeys.USER];

        const age = moment().diff(birthdate, 'years');
        transaction = await sequelize.transaction();

        const [user, measurement, program] = await Promise.all([
          User.create(config, { transaction }),
          UserMeasurement.create({
            ...userMeasurements,
            age,
          }, { transaction }),
          Program.create(programObj, { transaction }),
        ]);

        // Associate measurements and program
        await Promise.all([
          user.addUserMeasurement(measurement, { transaction }),
          user.addProgram(program, { transaction }),
        ]);

        await transaction.commit();
        transaction = undefined;

        const userFull = await UserApi.findByUuidRichData(user.uuid);

        const token = jwt.encode(user.uuid, jwtSecret);

        return { token, user: userFull };
      } catch (err) {
        throw new AppError(400, {
          usermessage: 'This email is already taken',
          devmessage: err.message,
        }, true);
      }
    } else {
      try {
        const user = await User.create(data);
        const token = jwt.encode(user.uuid, jwtSecret);

        return { token, user: User.sanitize(user) };
      } catch (err) {
        throw new AppError(400, {
          usermessage: 'This email is already taken',
          devmessage: err.message,
        }, true);
      }
    }
  } catch (err) {
    if (transaction) transaction.rollback();
    throw err;
  }
};

module.exports = signupV1;

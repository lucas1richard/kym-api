const { connectDatabase } = require('@kym/db');
const { bodySchema } = require('./validation');

const { User } = connectDatabase();

const updateUserV1 = async ({ data, uuid }) => {
  await bodySchema.validate(data, { abortEarly: false, allowUnknown: true });
  const user = await User.findByPk(uuid);

  const bodyCopy = { ...data };

  delete bodyCopy.id;
  delete bodyCopy.createdAt;
  delete bodyCopy.updatedAt;

  Object.entries(bodyCopy).forEach(([key, val]) => {
    user[key] = val;
  });

  const savedUser = await user.save();

  return savedUser;
};

module.exports = updateUserV1;

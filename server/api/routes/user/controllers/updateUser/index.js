const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const { bodySchema } = require('./validation');

const updateUser = async (body, uuid) => {
  await bodySchema.validate(body, { allowUnknown: true });
  const user = await User.findById(uuid);

  const bodyCopy = { ...body };

  delete bodyCopy.id;
  delete bodyCopy.createdAt;
  delete bodyCopy.updatedAt;

  Object.keys(bodyCopy).forEach((key) => {
    user[key] = bodyCopy[key];
  });

  const savedUser = await user.save();

  return savedUser;
};

module.exports = updateUser;

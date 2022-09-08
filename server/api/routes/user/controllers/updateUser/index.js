const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const { bodySchema } = require('./validation');

const updateUser = async (body, uuid) => {
  await bodySchema.validate(body, { allowUnknown: true });
  const user = await User.findByPk(uuid);

  const bodyCopy = { ...body };

  delete bodyCopy.id;
  delete bodyCopy.createdAt;
  delete bodyCopy.updatedAt;

  Object.entries(bodyCopy).forEach(([key, val]) => {
    user[key] = val;
  });

  const savedUser = await user.save();

  return savedUser;
};

module.exports = updateUser;

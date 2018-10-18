const { User } = include('db');
const { bodySchema } = require('./validation');

const updateUser = async (body, user_id) => {
  await bodySchema.validate(body, { allowUnknown: true });
  const user = await User.findById(user_id);

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

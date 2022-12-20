const { UserApi } = require('@kym/db');
const { bodySchema } = require('./validation');

const updateUserV1 = async ({ data, uuid }) => {
  await bodySchema.validate(data, { abortEarly: false, allowUnknown: true });
  const user = await UserApi.findByUuid(uuid);

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

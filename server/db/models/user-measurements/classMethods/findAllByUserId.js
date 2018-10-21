const { USER } = include('db/foreignKeys');

async function findAllByUserId(uuid) {
  const measurements = await this.findAll({
    where: {
      [USER]: uuid
    },
    order: [
      ['date', 'DESC']
    ]
  });
  return measurements;
}

module.exports = {
  findAllByUserId
};

import { AbbrevApi } from '@kym/db';

async function getRandomFoodV1() {
  return AbbrevApi.findRandomFood();
}

module.exports = getRandomFoodV1;

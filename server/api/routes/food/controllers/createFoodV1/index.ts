import { AbbrevApi } from '@kym/db';

type CreateFoodV1Arg = {
  data: any; // TODO
  uuid: string;
};

const createFoodV1 = async ({ data, uuid }: CreateFoodV1Arg) => {
  return AbbrevApi.createAbbrev({ data, uuid })
};

module.exports = createFoodV1;

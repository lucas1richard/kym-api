import { AbbrevApi } from '@kym/db';

const deleteFoodV1 = async ({ uuid, id }: { uuid: string, id: number }) => {
  await AbbrevApi.deleteAbbrev({ uuid, id });
};

module.exports = deleteFoodV1;
export default deleteFoodV1;

import { AbbrevApi } from '@kym/db';

const getUserCreatedV1 = async ({ uuid }: { uuid: string }) => {
  const abbrevsRichData = await AbbrevApi.getUserCreated({ uuid });

  return abbrevsRichData;
};

export default getUserCreatedV1;

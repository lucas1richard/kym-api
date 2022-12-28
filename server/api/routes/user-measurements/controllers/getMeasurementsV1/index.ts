import { UserMeasurementApi } from '@kym/db';

const getMeasurementsV1 = async ({ uuid }: { uuid: string }) => {
  const measurements = await UserMeasurementApi.findAllMeausrements({ uuid });
  return measurements;
};

export default getMeasurementsV1;
module.exports = getMeasurementsV1;

import { UserMeasurementApi } from '@kym/db';

interface IDeleteMeasurementsV1 {
  (arg: { id: number; uuid: string }): Promise<void>;
}
interface IDeleteMeasurementsV1 {
  (arg: { id: number[]; uuid: string }): Promise<void>;
}

const deleteMeasurementsV1: IDeleteMeasurementsV1 = async ({ id, uuid }) => {
  await UserMeasurementApi.removeMeasurement({ id, uuid });
};

export default deleteMeasurementsV1;
module.exports = deleteMeasurementsV1;

import { UserApi } from '@kym/db';

/* istanbul ignore next */
const addPreferenceV1 = async (uuid: string, abbrevId: number, preference: 'LIKE' | 'DISLIKE') => {
  return await UserApi.addFoodPreference({ uuid, abbrevId, preference });
}

export default addPreferenceV1;
module.exports = addPreferenceV1;

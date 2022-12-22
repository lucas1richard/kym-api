import { UserApi } from '@kym/db';

const getFavoriteFoods = async (uuid: string) => UserApi.findFavoriteFoods({ uuid });

export default getFavoriteFoods;

import { MealApi } from '@kym/db';

type GetMealsArg = {
  uuid: string,
  postWorkout?: boolean,
  keyword?: string,
  meals?: number[],
  excludeOwnMeals?: boolean,
};

const getMealV1 = async ({
  uuid, postWorkout, keyword, meals, excludeOwnMeals,
}: GetMealsArg) => {
  const indMeals = await MealApi.getMeals({
    uuid, postWorkout, keyword, meals, excludeOwnMeals,
  });

  return indMeals;
};

module.exports = getMealV1;

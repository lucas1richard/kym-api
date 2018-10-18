with t(
  id,
  Main,
  Sub,
  Calories,
  Protein,
  Fat,
  Carbohydrates,
  GmWt_1,
  GmWt_Desc1,
  GmWt_2,
  GmWt_Desc2,
  UserID,
  createdAt,
  updatedAt,
  photo
) as (
  select
    *
  from abbrevs
)
select json_agg(t) from t \g abbrevs_data_dump.json;


with t(
  id,
  Date,
  Meal,
  Quantity,
  Unit,
  fromProgram,
  confirmed,
  createdAt,
  updatedAt,
  mealId,
  abbrev_id,
  user_id
) as (
  select
    *
  from "foodRecords" where "user_id"=1
)
select json_agg(t) from t \g records_data_dump.json
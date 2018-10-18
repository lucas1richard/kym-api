const { sequelize } = include('db');

module.exports = autocomplete;

async function autocomplete(req, res, next) {
  try {
    const food = req.params.foodname.split(' ');
    const [foods] = await sequelize.query(`
    select * from
      (select distinct on ("Main")
        "abbrev"."Main",
        "abbrev"."Sub",
        "abbrev"."id"
      from "abbrevs" as "abbrev" 
      where "abbrev"."Main" ILIKE '%${food[0]}%'
    ) as "abbrev"
    order by 
      case
        when ("abbrev"."Main" ILIKE '${food[0]}%') then 'aaaaaa'
        else "abbrev"."Main"
      end;
    `);
    res.json(foods);
  } catch (err) {
    next(err);
  }
}

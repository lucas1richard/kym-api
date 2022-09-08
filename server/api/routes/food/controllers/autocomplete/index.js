const { connectDatabase } = require('@kym/db');

const { sequelize } = connectDatabase();

module.exports = autocomplete;

async function autocomplete(req, res, next) {
  try {
    const food = req.params.foodname.split(' ');
    const [foods] = await sequelize.query(`
    select * from
      (select distinct on ("main")
        "abbrev"."main",
        "abbrev"."sub",
        "abbrev"."id"
      from "abbrevs" as "abbrev" 
      where "abbrev"."main" ILIKE '%${food[0]}%'
    ) as "abbrev"
    order by 
      case
        when ("abbrev"."main" ILIKE '${food[0]}%') then 'aaaaaa'
        else "abbrev"."main"
      end;
    `);
    res.json(foods);
  } catch (err) {
    next(err);
  }
}

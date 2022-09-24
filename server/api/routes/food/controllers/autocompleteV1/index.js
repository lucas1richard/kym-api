const { connectDatabase } = require('@kym/db');

const { sequelize } = connectDatabase();

async function autocompleteV1({ foodname }) {
  const food = foodname.split(' ');
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
  return foods;
}

module.exports = autocompleteV1;

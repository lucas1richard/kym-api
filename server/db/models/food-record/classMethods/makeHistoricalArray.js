module.exports = makeHistoricalArray;

/**
 * Make a list of meals that the user has eaten in the past
 * @param {number} user_id
 * @return {Promise}
 * @this food-record
 */
async function makeHistoricalArray(user_id) {
  let record = await this.findAll({
    where: { user_id },
    order: ['Meal', 'Date']
  });

  if (record.length < 60) {
    record = await this.findAll({
      where: {
        user_id: 1
      },
      order: ['Meal', 'Date']
    });
  }

  const reducedRecord = record.reduce(recordReduce, [{}, {}, {}, {}, {}, {}]);
  function recordReduce(memo, rc) {
    const mm = memo;
    const date = rc.Date.toDateString();
    if (!memo[rc.Meal - 1][date]) {
      mm[rc.Meal - 1][date] = [];
    }
    const memoContainsRecordAlready = mm[rc.Meal - 1][date].filter(recordFilter).length;
    if (!memoContainsRecordAlready) {
      mm[rc.Meal - 1][date].push(rc);
    }
    return mm;
    function recordFilter(rec) {
      return rec.id === rc.id;
    }
  }

  const filteredRecord = reducedRecord;
  Object.keys(reducedRecord).forEach((meal) => {
    Object.keys(reducedRecord[meal]).forEach((date) => {
      if (reducedRecord[meal][date].length < 3) delete filteredRecord[meal][date];
    });
  });
  return filteredRecord;
}
// function makeHistoricalArray(user_id) {
//   return this.findAll({
//     where: { user_id },
//     order: ['Meal', 'Date']
//   })
//     .then(record => (record.length > 60
//       ? record
//       : this.findAll({
//         where: { user_id: 1 },
//         order: ['Meal', 'Date']
//       }))
//     )
//     .then(record => record.reduce((memo, rc) => {
//       const mm = memo;
//       const date = rc.Date.toDateString();
//       if (!memo[rc.Meal - 1][date]) {
//         mm[rc.Meal - 1][date] = [];
//       }
//       const memoContainsRecordAlready = mm[rc.Meal - 1][date].filter(rec => rec.id === rc.id).length;
//       if (!memoContainsRecordAlready) {
//         mm[rc.Meal - 1][date].push(rc);
//       }
//       return mm;
//     }, [{}, {}, {}, {}, {}, {}]))
//     .then((record) => {
//       const filteredRecord = record;
//       Object.keys(record).forEach((meal) => {
//         Object.keys(record[meal]).forEach((date) => {
//           if (record[meal][date].length < 3) delete filteredRecord[meal][date];
//         });
//       });
//       return filteredRecord;
//     });
// }

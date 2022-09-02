const { connectDatabase } = require('@kym/db');
const { FoodRecord } = connectDatabase();
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const updateRecordStatus = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const { ids, status } = req.body;

    // First get the records
    const records = await Promise.all(ids.map((id) => {
      return FoodRecord.findById(id);
    }));

    // Update the records
    await Promise.all(records.map((record) => {
      record.confirmed = status; // eslint-disable-line
      return record.save();
    }));

    // Get the updated records again
    const rawSavedRecords = await Promise.all(ids.map((id) => {
      return FoodRecord.findById(id);
    }));

    const savedRecords = await Promise.all(rawSavedRecords.map((record) => {
      return record.calMacros();
    }));

    res.json(savedRecords);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update the record status');
    next(err);
  }

  // try {
  //   const record = await FoodRecord.findById(req.params.recordId);
  //   record.confirmed = req.params.status;
  //   await record.save();
  //   const savedRecord = await FoodRecord.findById(record.id);
  //   res.json(savedRecord.calMacros());
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = updateRecordStatus;

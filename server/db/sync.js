const conn = require('./conn');

let options;
if (process.env.FORCE_DB_SYNC) {
  options = {
    force: true
  };
}

console.log(options);

async function sync() {
  await conn.sync(options);
  console.log('synced');
  // process.exit();
}

sync();

const mongoose = require('mongoose');

let options = {
  keepAlive: true,
  connectTimeoutMS: 300000,
  socketTimeoutMS: 300000,
  useNewUrlParser: true,
  useFindAndModify: false,
  bufferMaxEntries: 0,
  poolSize: 5,
  useUnifiedTopology: true
};

const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_SOURCE}&authMechanism=SCRAM-SHA-1`;

const db = mongoose.createConnection(mongoUrl, options);
mongoose.set('useCreateIndex', true);

db.once('connected', () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Mongodb connection', process.env.NODE_ENV);
  }
  return db;
});
db.on('disconnected', () => {
  console.log('connection disconnected');
});
db.on('error', err => {
  console.log(`Error in mongodb connection: ${err}`);
});
process.on('exit', code => {
  db.close();
  console.log(`About to exit with code: ${code}`);
});
process.on('SIGINT', function () {
  console.log('Caught interrupt signal');
  process.exit();
});

module.exports.mongoDB = db.useDb(process.env.MONGO_DB);
const mongoose = require('mongoose');

const init = () => {
  // Update .env file with this values
  const user = encodeURIComponent(process.env.mongoUser);
  const pass = encodeURIComponent(process.env.mongoPass);
  const url = process.env.mongoUrl;
  const db = process.env.mongoDb;
  mongoose.connect(`mongodb+srv://${user}:${pass}@${url}/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection.on('error', error =>
    console.error('Connection to MongoDB failed with error:', error),
  );
  mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
};

module.exports = { init };

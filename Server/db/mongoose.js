var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mlab = 'mongodb://khizer:khizer@ds227459.mlab.com:27459/mongoose-for-nodejs';

mongoose.connect(process.env.DATABASE_URI || mlab);

module.exports = {mongoose};

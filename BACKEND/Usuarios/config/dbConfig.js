const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    console.log("Retry in 5 seconds");
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;

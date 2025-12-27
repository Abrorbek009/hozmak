const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB ga ulanish udar bo'ldi...");
  } catch (e) {
    console.error(`MongoDB xatosi: ${e.message}`);
    process.exit(1);
  }
};

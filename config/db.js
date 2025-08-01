const mongoose = require('mongoose');
const uri = "mongodb+srv://sayalikatole02:sayuK02@expense-manager.fzmvr7f.mongodb.net/?retryWrites=true&w=majority&appName=expense-manager";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;
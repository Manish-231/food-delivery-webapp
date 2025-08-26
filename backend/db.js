const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://manishsuperstar2312:Singh%402312@cluster0.w6onwzu.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");

    // Access the collections
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const food_category = await mongoose.connection.db.collection("food_category").find({}).toArray();

    // Save in globals
    global.food_items = fetched_data;
    global.food_category = food_category;

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

module.exports = mongoDB;

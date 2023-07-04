// api/mapPoints.js
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/MapApp';

// MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB database
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

// Insert map points into the database
const insertMapPoints = async (points) => {
  try {
    const collection = client.db('MapApp').collection('mapPoints');
    await collection.insertOne({ points });
  } catch (error) {
    throw new Error('Error inserting map points:', error);
  }
};

// Delete map points from the database
const deleteMapPoints = async () => {
    try {
      const collection = client.db('<database>').collection('mapPoints');
      await collection.deleteMany({});
    } catch (error) {
      throw new Error('Error deleting map points:', error);
    }
  };
  
// Fetch map points from the database
const fetchMapPoints = async () => {
    try {
      const collection = client.db('<database>').collection('mapPoints');
      const result = await collection.findOne({});
      return result?.points || [];
    } catch (error) {
      throw new Error('Error fetching map points:', error);
    }
  };
  
module.exports = { insertMapPoints, deleteMapPoints, fetchMapPoints };
    
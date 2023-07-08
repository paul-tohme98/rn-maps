// api/mapPoints.js
const { MongoClient } = require('mongodb');
const express = require('express');

const app  = express();
app.use(express.json());

// Mount the mapPointsRoutes
// app.use('/api/mapPoints', mapPointsRoutes);

// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

// Verify that server is activated
app.get('/', (req,res) => {
  console.log("Server is up at port 8080!");
  res.send('<h1>MongoDB server is up!</h1>');
});

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

app.post('/insert-points', async (req, res) => {
  try {
    // const points = req.body.points;
    console.log("Points from server side:");
    console.log(req.body[0][0]);

    const collection = client.db('MapApp').collection('mapPoints');
    for(rec of req.body[0]){
      await collection.insertOne(rec);
      console.log('Points inserted successfully:', rec);  
    }

    // res.status(200).json({ message: 'Points inserted successfully' });
  } catch (error) {
    console.error('Error inserting map points:', error);
    res.status(500).json({ error: 'Failed to insert map points' });
  }
});



// Insert map points into the database
const insertMapPoints = async (points) => {
  
};

// app.get('/insert-points', async (req, res) => {
//   try {
//     const collection = client.db('MapApp').collection('mapPoints');
//     const result = await collection.findOne({});
//     console.log("Record found");
//     return result?.points || [];
//   } catch (error) {
//     throw new Error('Error fetching map points:', error);
//   }
// });



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
  
module.exports = { deleteMapPoints, fetchMapPoints };
    
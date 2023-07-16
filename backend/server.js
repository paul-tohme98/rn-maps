// api/mapPoints.js
const { MongoClient } = require('mongodb');
const express = require('express');

const app  = express();
app.use(express.json());


// Start the server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
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

// Verify that server is activated
app.get('/', (req,res) => {
  console.log("Server is up at port 8080!");
  res.send('<h1>MongoDB server is up!</h1>');
});

// Retrieve data from MongoDB
app.get('/get-maps', async (req, res) => {
  try {
    const collection = client.db('MapApp').collection('mapPoints');
    const cursor = collection.find({});
    const data = await cursor.toArray();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching map points:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get-maps/points', async (req, res) => {
  try{
    const db = client.db('MapApp');
    const collection = db.collection('mapPoints');

  // Find the document with the latest date
    collection.findOne({}, { sort: { ['date']: -1 } })
      .then((latestDocument) => {
        if (latestDocument) {
          console.log("Document with the latest date:", latestDocument);
          res.json(latestDocument);
          return latestDocument;
        } else {
          console.log("No documents found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching data from MongoDB:", err);
        client.close();
      });
  }
  catch(err){
    console.log("Failed to fetch latest document", err);
  }
})


// Insert the points of the drawn map in the mongoDB as a single File containing all these points
app.post('/insert-points', async (req, res) => {
  try {
    console.log("Points from server side:");
    console.log(req.body);

    const collection = client.db('MapApp').collection('mapPoints');
    
    for (const mapKey in req.body) {
      const points = req.body[mapKey];
      const currentDate = new Date(); // Get the current date
      const mapData = {
        "points": points,
        date: currentDate // Add the current date to the mapData object
      };

      await collection.insertOne(mapData);
      console.log(`Points inserted successfully for map ${mapKey}:`, mapData);
    }

    res.status(200).json({ message: 'Points inserted successfully' });
  } catch (error) {
    console.error('Error inserting map points:', error);
    res.status(500).json({ error: 'Failed to insert map points' });
  }
});

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
    
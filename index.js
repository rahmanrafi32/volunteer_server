const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectID  = require('mongodb').ObjectID;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@firstcluster.bte1v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteer").collection("events");
  
  app.post('/addEvent', (req,res)=>{
      const newEvent = req.body;
      collection.insertOne(newEvent)
      .then(result =>{
          console.log(result.insertedCount);
      })
  })

  app.get('/events', (req,res)=>{
      collection.find({})
      .toArray((err,documents)=>{
          res.send(documents);
      })
  })

  app.delete('/deleteEvent/:id', (req,res)=>{
      const id = ObjectID(req.params.id);
      collection.findOneAndDelete({_id:id})
  })
});


app.get('/', (req,res)=>{
    res.send('its working')
})

app.listen(port);
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const port = 4550;

let db;

async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://realityaudiostudio:njan4abhi6siva@alanjs.ddjefp8.mongodb.net/?retryWrites=true&w=majority&appName=alanjs');
    await client.connect();
    db = client.db('muzify');
 }

 app.use(cors());
app.use(express.json());

app.get('/users',async function(req,res){
  let output = await db.collection('users').find({}).toArray();
  res.json(output);
})

app.post('/users',async function (req,res) {
  let output = await db.collection('users').insertOne(req.body);
  console.log(req.body);
  res.json(output);
})

app.post('/login', async function(req, res) {
  console.log('Login attempt:', req.body);
  const { username, password } = req.body;
  try {
      let usr = await db.collection('users').findOne({ username, password });
      if (usr) {
          console.log('Login successful:', usr);
          res.json({ success: true, usr });
      } else {
          console.log('Invalid USER or PASS');
          res.json({ success: false, message: 'Invalid USER or PASS' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products',async function (req,res) {
  let products = await db.collection('products').find({}).toArray();
  res.json(products);
  
})



app.get('/',(req,res)=>res.send('Nochu is live at port '+port));
app.listen(port,function(){
  console.log('Server runs at : '+port);
  mongoConnect();
});

//
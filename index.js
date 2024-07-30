const express = require('express');
const cors = require('cors');
const app = express();
const port = 4550;

app.get('/',(req,res)=>res.send('Now I am at port '+port));
app.listen(port,console.log('Server runs at : '+port));

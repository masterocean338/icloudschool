const express =require('express');
const bodyParser =require('body-parser');
const path= require('path');
const cors =require('cors');
const http=require('http');

const mongoose = require('mongoose');


const app = express();

const port =process.env.PORT || 8080;
const db= "mongodb://216.10.242.121:27017";
const conn = mongoose.createConnection(db);
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Request-Method",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});







app.use(express.static(path.join(__dirname,'public')));
app.get('/*',(req,res)=> res.sendFile(path.join(__dirname,'public/index.html')));



app.get('/',function(req, res){
    res.send('Hello from server');
})
app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});





/*const server=http.createServer(app);
server.listen(port,()=>console.log("Running"));*/
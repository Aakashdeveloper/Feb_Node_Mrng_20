var express  =require('express');
const app = express();
const port = 8700
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const mongourl= "mongodb://localhost:27017"
let db;
let col_name = "febnode";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('health Check')
});

//Get
app.get('/user',(req,res)=> {
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
});

//Post
app.post('/addUser',(req,res) =>{
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Added')
        }
    })
})


MongoClient.connect(mongourl,(err,client) =>{
    if(err) console.log('Error while coonnecting')
    db= client.db('classpractice');

    app.listen(port,(err) => {
        console.log(`App is running on port ${port}`)
    })
})
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
/*
app.get('/user',(req,res)=> {
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err){
            throw err
        }else{
            res.send(result)
        }
    })
});*/

app.get('/user',(req,res)=> {
    var query = {}
    if(req.query.id){
        query={id:parseInt(req.query.id),isactive:true}
    }else{
        query={isactive:true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
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

//Update
app.put('/updateuser',(req,res) => {
    db.collection(col_name)
        .findOneAndUpdate({"id":req.body.id},{
            $set:{
                "id": req.body.id,
                "name": req.body.name,
                "city": req.body.city,
                "age":req.body.age
            }
        },(err,result) => {
            if(err){
                res.status(401).send('Error in updating')
            }else{
                res.send("Data Updated")
            }
        })
})

//Delete
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "id":req.body.id
    },(err,result) => {
        if(err){
            res.status(401).send('error in deleting')
        }else{
            res.send("Data deleted")
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
import express from 'express';
import database from './database';
const app = express();
const port = 8800;


app.get('/mydata',(req,res) => {
    let output = database.prototype.getData('first')
    res.send(output)
});


app.post('/mydata',(req,res) => {
    var mydata = {"name":"John", "class":"node"}
    let output= database.prototype.postData('first',mydata);
    res.send(output)
})


app.listen(port,(err) => {
    console.log(`Serveris listing to port ${port}`)
})


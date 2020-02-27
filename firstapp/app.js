var express = require('express');
var app = express();
var port = 8900;
var moviesRouter = require('./src/routes/moviesRoute');
var productRouter = require('./src/routes/productRoute');

//Static Filee Path
app.use(express.static(__dirname+'/public'))
//view file
app.set('views', './src/views')
//View engine
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    //res.send("Welcome to node api")
    res.render('home')
});

app.use('/movies',moviesRouter);
app.use('/product',productRouter);

app.listen(port,function(err){
    if(err) throw err;
    else{
        console.log('App is running on port '+port)
    }
});


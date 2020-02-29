var express = require('express');
var app = express();
var port = 8900;

var navbar=[
    {name:'Home',path:'/'},
    {name:'Movies',path:'/movies'},
    {name:'Product',path:'/product'}
]

var moviesRouter = require('./src/routes/moviesRoute')(navbar);
var productRouter = require('./src/routes/productRoute')(navbar);

//Static Filee Path
app.use(express.static(__dirname+'/public'))
//view file
app.set('views', './src/views')
//View engine
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    //res.send("Welcome to node api")
    res.render('home',{title:'Home Page',navigation:navbar})
});


app.use('/movies',moviesRouter);
app.use('/product',productRouter);

app.listen(port,function(err){
    if(err) throw err;
    else{
        console.log('App is running on port '+port)
    }
});


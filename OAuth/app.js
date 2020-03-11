var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var superagent = require('superagent');
var request = require('request');
const port = 7800;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/',(req,res) => {
    res.render('index')
})

app.get('/user', (req,res) => {
    const {query} = req
    const {code} = query
    if(!code){
        res.send({
            success:false,
            message:'Error on code'
        })
    }

    console.log(">>>>>>>code",code)
    superagent
        .post("https://github.com/login/oauth/access_token")
        .send({
            client_id:"6ea5060653b4b5779993",
            client_secret:"c94d69445e98283b32685b29aa685cd16f53250c",
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            var acctoken = result.body.access_token
            const options = {
                url: 'https://api.github.com/user',
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Authorization':'token '+acctoken,
                    'User-Agent': 'my-reddit-client'
                }
            };
            var output;
            request(options, function(err,response,body){
                output=body
                return res.send(body)
            });

        })
})


app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})
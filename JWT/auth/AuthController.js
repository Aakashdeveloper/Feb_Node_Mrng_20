var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../config');
var bcrypt = require('bcryptjs'); 

var User = require('./MongooseCont');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.post('/register', (req,res) => {
    var hashedpassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password : hashedpassword,
        role: req.body.role?req.body.role:'User'
    },
    (err,user) => { 
        if(err) return res.status(500).send('There was a problem in registeration') 
        res.setHeader('Access-control-Allow-Origin','*')
        res.setHeader('Access-control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
        res.status(200).send('Registration successful')
    })
})


router.post('/login', (req,res) => {
    User.findOne({email: req.body.email}, (err,user) => {
        if(err) return res.status(500).send('Error on server')
        if(!user) return res.status(404).send('No user found')
        else{
            const passIsValid = bcrypt.compareSync(req.body.password, user.password)
            if(!passIsValid) return res.status(401).send({auth:false, token:null})
            var token = jwt.sign({id:user._id}, config.secert,{expiresIn:86400})
            res.send({auth:true,token:token})
        } 
    })
})

router.get('/userinfo', (req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.status(401).send({auth:false,token:'No Token provided'});
    jwt.verify(token, config.secert,(err,decode) => {
        if(err) return res.status(500).send('There was a problem in token') 
        User.findById(decode.id,{password:0},(err,user) =>{
            if(err) return res.status(500).send({auth:false,token:'Fail to get user'})
            if(!user) res.status(401).send({auth:false,token:'No User found'})
            res.send(user)
        } )
    })
})

router.get('/users',(req,res) => {
    User.find({},(err,user) => {
        if(err) throw err;
        res.send(user)
    })
})


module.exports = router
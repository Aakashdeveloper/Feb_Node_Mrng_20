var express = require('express');
var productRouter = express.Router();

function router(navbar){
  productRouter.route('/')
      .get(function(req,res){
        mongodb.connect(url,function(err,dc){
          if(err){
            res.status(501).send('Error while connecting')
          }else{
            const dbo = dc.db('classdatabase');
            dbo.collection('products').find({}).toArray((err,data) => {
              if(err){
                res.status(402).send('Error while fetching data')
              }else{
                res.render('product',{title:'Product Page',navigation:navbar})
              }
            })
          }
        })
          
  });

  productRouter.route('/details')
    .get(function(req,res){
      res.send('Details of Product')
  });

  return productRouter
}


module.exports = router
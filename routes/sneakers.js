'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
// const db = express.Db();
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();


    
//Grabs all sneakers from the Sneakers database
  router.get('/', function(req, res){
    models.Sneakers.findAll().then(function(sneakers){
      res.render('sneakers/all', {
      sneakers: sneakers
      });
    });
  });


  
  
//Grab a single sneaker from the dabase and all others that match its style id
router.get('/:id/detail', function(req, res){
  models.Sneakers.findByPk(req.params.id).then(function(snkr){
    models.Sneakers.findAll({ where: { sneakerName: snkr.sneakerName } }).then(function(sneakers){
      // get data from the api using the styleID given
      sneaks.getProductPrices(snkr.styleID, function(err, product){
      res.render('sneakers/detail', {
        // load data into html
      sneakers: JSON.stringify(sneakers),
      snkr: snkr,
      apiData: JSON.stringify(product),
    });
  });
});
});
});
  
  


//Grabs all sneakers from the Sneakers database
router.get('/vis', function(req, res){  
  sneaks.getProducts('nike', function(error, products){
    models.Sneakers.findAll().then(function(sneakers){
      res.render('sneakers/visuals', {
      sneakers: sneakers,
      maxSnkrs: JSON.stringify(products),
      });
    });
  })
});


// search using the api. then load data to html
router.get('/search', function(req, res, next){  
  if (req.query.search) {
    sneaks.getProducts(req.query.search, function(error, products){
      res.render('sneakers/search',{
        products: products
      })
    })
  }

});


router.get('/:id/more', function(req, res, next){
  sneaks.getProductPrices(req.params.id, function(error, products){
    res.render('sneakers/moreDetail', {
      products:products,
    })
  })
});


      
module.exports = router;

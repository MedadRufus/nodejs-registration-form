const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('http-auth');
const router = express.Router();
const { body } = require('express-validator');
const homeController = require('../controllers/homeController');
const viewDataController = require('../controllers/viewDataController');

const Registration = mongoose.model('Registration');
var csv = require('csv');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
})


//ALTER THE ROUTE TO USE OUT NEW TEMLPLATE

router.get('/', homeController.home);
router.get('/view_data', viewDataController.home);



router.post(
  '/',
  [
    body('firstname')
      .isLength({ min: 1 })
      .withMessage('Please enter first name'),
    body('lastname')
      .isLength({ min: 1 })
      .withMessage('Please enter last name'),
    body('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],

  (req, res) => {
    homeController.submitfForm(req, res);
  }
);

router.get('/message', auth.connect(basic), (req,res) => {
  Registration.find()
  .then((message) =>{
    res.render('index', {title: 'listing data', message});
  })
.catch(() =>{res.send('Sorry! Something went wrong');})

}); 


router.get('/csv_data', (req,res) => {
  console.log("csv read requested")
  download(req,res);

}); 


const download = (request, response) =>{
  
  // Obtain your cursor ...
  const cursor = Registration.find();
 
  // The transformer function
  const transformer = (doc)=> {
    return {
        topic: doc.topic,
        message: doc.message,
    };
  };
  
  // Name of the downloaded file - e.g. "Download.csv"
  const filename = "Download.csv";

  // Set approrpiate download headers
  response.setHeader('Content-disposition', `attachment; filename=${filename}`);
  response.writeHead(200, { 'Content-Type': 'text/csv' });

  // Flush the headers before we start pushing the CSV content
  response.flushHeaders();

  // Pipe/stream the query result to the response via the CSV transformer stream 
  cursor.stream()
      .pipe(csv.transform(transformer))
      .pipe(csv.stringify({header: true}))
      .pipe(response);
}



module.exports = router;
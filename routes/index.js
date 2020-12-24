const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('http-auth');
const router = express.Router();
const { body } = require('express-validator');
const homeController = require('../controllers/homeController');
const viewDataController = require('../controllers/viewDataController');

const Registration = mongoose.model('Registration');

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
    res.render('index', {title: 'listing registration', message});
  })
.catch(() =>{res.send('Sorry! Something went wrong');})

}); 


module.exports = router;
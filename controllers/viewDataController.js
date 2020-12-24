
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Registration = mongoose.model('Registration');


exports.home = (req, res) => {
    res.render('data_view', {title: "Event Registration"})
}

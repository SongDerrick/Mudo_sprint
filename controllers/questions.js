
const questions = require('../data/data.json')
const User = require('../models/userdata');

exports.getQuestionData = (req, res, next) => {
    console.log(questions)
    res.send(questions)
} // Function 1 : GET Question Data API

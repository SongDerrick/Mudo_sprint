
const questions = require('../data/data.json')
const User = require('../models/userdata');

exports.getSendQuestions = (req, res, next) => {
    //res.send(questions.at(0).a.at(0).answer);
    res.render('admin/question-list', {
        questions: questions
    });
} // this middle ware routes /survey -> this displays questions

exports.getQuestionData = (req, res, next) => {
    console.log(questions)
    res.send(questions)
} // Function 1 : GET Question Data API

exports.postUserData = (req, res, next) => {
    const weight = req.body.weight;
    console.log(weight);
    const newuser = new User(weight);
    newuser.save();
    res.redirect('/questions');
}

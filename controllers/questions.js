
const questions = require('../data/data').questionList;
const User = require('../models/userdata');


exports.getSendQuestions = (req, res, next) => {
    //res.send(questions.at(0).a.at(0).answer);
    res.render('admin/question-list',{
        questions : questions
    } );
} // this middle ware routes /survey -> this displays questions

exports.postUserData = (req, res, next) => {
    const weight = req.body.weight;
    console.log(weight);
    const newuser = new User(weight);
    newuser.save();
    res.redirect('/questions');
}

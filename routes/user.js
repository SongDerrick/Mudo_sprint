const express = require('express');

const router = express.Router(); // will create different paths with router function 

const questionsController = require('../controllers/questions');
// requiring question.js controller which functions main business logic

router.get('/questions', questionsController.getSendQuestions);
// '/questions' get method defined via controller -> this method shows questions

router.post('/questions', questionsController.postUserData);
// '/questions' get method defined via controller -> this method shows questions

router.get('/', questionsController.getQuestionData);
module.exports = router;
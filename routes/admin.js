const express = require('express');

const router = express.Router(); // will create different paths with router function 
const analysisController = require('../controllers/analysis');
router.get('/results', (req, res, next) => {
    res.send('<h1>HI</h1>');
}) // this middle ware routes /results -> this displays results of the survey

router.post('/results', (req, res, next) => {

})

router.get('/query', analysisController.getQuery);
router.get('/analysis', analysisController.getAnalysis);
module.exports = router;
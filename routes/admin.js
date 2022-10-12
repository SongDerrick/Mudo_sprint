const express = require('express');

const router = express.Router(); // will create different paths with router function 
const analysisController = require('../controllers/analysis');

//router.get('/query', analysisController.getQuery);
router.get('/analysis', analysisController.getAnalysis);
router.post('/userdata', analysisController.postUserData);
module.exports = router;
const express = require('express');

const router = express.Router(); // will create different paths with router function 

router.get('/results', (req, res, next) => {
    res.send('<h1>HI</h1>');
}) // this middle ware routes /results -> this displays results of the survey

router.post('/results', (req, res, next) => {
    
})

module.exports = router;
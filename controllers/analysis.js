const userData = require('../data/userdata.json')
const questionData = require('../data/data.json')


exports.getQuery = (req, res, next) => {
    const newUser = userData;
    const newUserArray = [];
    console.log(newUser);
    for (let i = 0; i < newUser.length; i++) {
        newUserArray.push(newUser[i].value);
        console.log(newUserArray[i]);
    }

    const occurrences = {};
    for (const v of newUserArray) {
        occurrences[v] = occurrences[v] ? occurrences[v] + 1 : 1;
    }
    let maxkey = Object.keys(occurrences).reduce(function (a, b) { return occurrences[a] > occurrences[b] ? a : b });
    let arr = []
    for (i = 0; i < newUser.length; i++) {
        if (newUser[i]['value'] === maxkey) {
            arr.push(i);
        }
    }
    const questions = questionData;
    const newquestionArray = [];
    for (let i = 0; i < questions.length; i++) {
        newquestionArray.push(questions[i]);
    }
    console.log(newquestionArray)
    console.log(arr)
    let result = []
    for (i of arr) {
        for (j = 0; j < newquestionArray[i].a.length; j++) {
            if (newquestionArray[i].a[j]["weight"] === maxkey) {
                result.push(newquestionArray[i].a[j]["answer"])
            }
        }
    }
    res.send(result);
};
const userData = require('../data/userdata1.json')
const questionData = require('../data/data.json');
const fs = require('fs')
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'userdata1.json' 
); // path configuration

exports.getAnalysis = (req, res, next) => {


    const newUser = userData; // user data 가져옴
    const newUserArray = []; // user data 를 어레이로
    const mostPicked = []; // 가장 많이 뽑힌 후보 중에서 유저가 고른 문항의 인덱스를 저장
    const multipleCandidate = []; // 두 명이상의 후보가 선정되었을 경우에 사용
    const questions = questionData; // 질문 데이터 JSON 파일로 가져와서 
    const newquestionArray = []; // 새 어레이에 담을 예정 question을 개별로 담을 것
    let arr = []; // 선택된 후보자의 모든 공약 담을 예정
    const result = []; // 최종 결과 어레이

    for (var key in newUser) {
        if (newUser.hasOwnProperty(key)) {
            //console.log(key + " -> " + newUser[key]); 디버그 용
            newUserArray.push(newUser[key]); // user data의 후보자 네임을 어레이로
        }
    } 

    // console.log(newUserArray); 디버그 용 코드
    
    const occurrences = {};
    for (const v of newUserArray) {
     occurrences[v] = occurrences[v] ? occurrences[v] + 1 : 1;
    } // 갯수세기
    // console.log(occurrences); //갯수 세서 객체로 디버그 용 코드

    const candidatekey = Object.values(occurrences);
    const max = Math.max(...candidatekey);
    //console.log(max);
    //console.log(candidatekey)

    var count = 0;

    for(i in candidatekey){
        if(candidatekey[i] == max)
            count++;
    }
    //console.log(count); // 동일 결과를 위한 다른 방안

    if(count == 1){ // 1. 최대 득표 후보자가 한명일 경우 
        let maxkey = Object.keys(occurrences).reduce(function (a, b) { return occurrences[a] > occurrences[b] ? a : b });
        console.log(maxkey); //가장 많은 표 받은 후보 디버그 용 코드
        // console.log(occurrences[maxkey]);// 가장 많은 표 받은 후보의 선정 횟수 예시 5회 5/11회

        for(i = 0; i < newUserArray.length; i++){
            if(newUserArray[i] == maxkey)
                mostPicked.push(i);
        } // 가장 많이 선택된 후보의 어떤 공약을 선택했는지 인덱스 파인딩
    
        // console.log(mostPicked); 

        for (let i = 0; i < questions.length; i++) {
            newquestionArray.push(questions[i]);
            for (j = 0; j < newquestionArray[i].choices.length; j++) {
                if (newquestionArray[i].choices[j]["value"] === maxkey) {
                   arr.push(newquestionArray[i].choices[j]["text"])
                }
            }
        } // question을 통째로 newquestionArray에 넣을 것 순차대로 그러면서 arr에는 가장 많이 선택된 후보자의 공약만 넣음
    
        // console.log(arr); 디버그 용 코드
    
        for(value of mostPicked){
            // console.log(value) 디버그 용 코드
            for(let i = 0; i < arr.length; i++){
                if(value == i)
                    result.push(arr[i])
            }
        } // 선택한 문항에서 후보자의 공약 추출 -> 즉 사용자가 고른 공약 중 가장 적합한 후보자의 것만 추출함 -> result로
    
        res.send(result);
    }
    else{ // 두 명 이상의 후보자가 최대 득표를 받았을 경우

      for(i in candidatekey){
        if(candidatekey[i]==max)
            multipleCandidate.push(Object.keys(occurrences)[i]);
      }
      // console.log(multipleCandidate);

      for(i in multipleCandidate){
        let maxkey = multipleCandidate[i];

        for(i = 0; i < newUserArray.length; i++){
            if(newUserArray[i] == maxkey)
                mostPicked.push(i);
        }

        // console.log(mostPicked)

        for (let i = 0; i < questions.length; i++) {
            newquestionArray.push(questions[i]);
            for (j = 0; j < newquestionArray[i].choices.length; j++) {
                if (newquestionArray[i].choices[j]["value"] === maxkey) {
                   arr.push(newquestionArray[i].choices[j]["text"])
                }
            }
        } // question을 통째로 newquestionArray에 넣을 것 순차대로 그러면서 arr에는 가장 많이 선택된 후보자의 공약만 넣음

  // 선택한 문항에서 후보자의 공약 추출 -> 즉 사용자가 고른 공약 중 가장 적합한 후보자의 것만 추출함 -> result로
      }

      for(value of mostPicked){
        // console.log(value) 디버그 용 코드
        for(let i = 0; i < arr.length; i++){
            if(value == i)
                result.push(arr[i])
        }
    } 
      res.send(result)
    }

}; // Function 2 : GET Result Data from user data and Find largest valued candidate

exports.postUserData = (req, res, next) => {
    const freshUser = req.body;
    console.log(freshUser); // post method data received.

    const freshUserJSON = JSON.stringify(freshUser); //JSON.stringify
    console.log(freshUserJSON)
    fs.writeFileSync(p,freshUserJSON);//wrote on file system as JSON file

}; // Function 4 : POST Result Data from front end
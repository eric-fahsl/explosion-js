"use strict";
// let elasticsearch = require('elasticsearch');
var firebase = require("firebase");
var FirebaseWriter = (function () {
    function FirebaseWriter() {
        var _this = this;
        firebase.initializeApp({
            serviceAccount: "TAWorkshop-26ac142847c2.json",
            databaseURL: "https://taworkshop-32e79.firebaseio.com"
        });
        this.questionRef = firebase.database().ref('survey-questions');
        // this.questionRef.on('value', function (data) {
        //     this.surveyQuestions = data.val();
        //     
        // });
        this.questionRef.on('value', function (data) {
            _this.surveyQuestions = data.val();
            console.log(_this.surveyQuestions);
        });
    }
    FirebaseWriter.prototype.addNewQuestions = function (question, name) {
        if (!name) {
            var questionLength = this.surveyQuestions.questions.length + 1;
            name = "question" + questionLength;
        }
        var newQuestion = { "description": question, "name": name };
        this.surveyQuestions.questions.push(newQuestion);
        this.questionRef.set(this.surveyQuestions);
        console.log("question added: ", question);
    };
    FirebaseWriter.prototype.restoreDefaultQuestions = function () {
        this.surveyQuestions = {
            "questions": [
                {
                    "name": "question0",
                    "description": "What technology are you excited to learn about at the workshops?"
                }
            ]
        };
        this.questionRef.set(this.surveyQuestions);
        console.log("questions restored.");
    };
    return FirebaseWriter;
}());
exports.FirebaseWriter = FirebaseWriter;
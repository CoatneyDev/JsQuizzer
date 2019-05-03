
    class Question {

        constructor(id, question, snippet, choices) {
            this.id = id;
            this.question = question;
            this.snippet = snippet;
            this.choices = choices;
        };

        display(callback) {
            callback();
        };
    }


    class QuestionFactory {

        constructor() {
            this.createQuestionFrom = function(obj) {
                return new Question(obj.id, obj.question, obj.snippet, obj.choices);
            }
        };

        // returns array of Question objects from
        // fully qualified JSON obj in the format:
        // [{"id":"1","question":"string","snippet":"string",choices:["a","b","c","d","e"]},...]
        getQuestions(obj){
            let arr = obj;
            let questions = new Array();
            
             // loop through objects and create questions 
             arr.forEach(element => {
                questions.push( this.createQuestionFrom(element) );
             });

             return questions;
        };
    }

    class Answer {

        constructor(id, answer, choice) {
            this.id = id;
            this.answer = answer;
            this.choice = choice;
        };

    }

    class AnswerFactory {
        constructor() {
            this.createAnswerFrom = function(obj) {
                let anew = new Answer(obj.id, obj.answer, obj.choice);

                return anew;
            }
        };

        // returns array of Answer objects from
        // fully qualified JSON obj in the format:
        // [{"id":"1","answer": "d"},...]
        getAnswers(obj){
            let arr = obj;
            let answers = new Array();
            
             // loop through objects and create questions 
             arr.forEach(element => {
                answers.push( this.createAnswerFrom(element) );
             });

             return answers;
        };
    }

    class GameClock {
        constructor(clock){
            this.clock = clock; // display element
            //this.callback = callback;
        };

        
        startTimer() {
            let counter = 0;
            let game = this;
            const TENMINUTES = 600;

            function updateTimer() {
                
                game.updateClock(game.clock, counter);
                counter++;

                if(counter === TENMINUTES){
                    stopTimer();
                    //this.callback();
                }
                else {
                    game.gameTime = setTimeout(updateTimer, 1000);
                }
               
            };

            return updateTimer;
        };

        stopTimer() {
           
            clearTimeout(this.gameTime);
            this.gameTime = null;
            this.updateClock(this.clock,0);
             
        };


        // clock is the element where game time will 
        // be displayed. seconds is total seconds since
        // game began. clock will be updated in the 
        // format mm:ss
        updateClock(clock,seconds) {
            let s = seconds > 59 ? seconds % 60 : seconds;
            let m = seconds > 59 ? Math.floor(seconds / 60) : 0;
            let s2 = "00";
            
            if (s < 10) {
                 s2 = "0" + s;
            } else
                s2 = s;

            clock.innerHTML = m + ":" + s2;
        };

    }



// MODEL
// QuizModel cares about data. In this case AJAX calls
// in the form of JS Promises. Server side calls are
// made here only. QuizModel handles JSON and objects
// coming from the server.
class QuizModel {

    constructor() {
        this.questions = new Array();
        this.answers = new Array();
        this.id = "QuizModel";
    };

	async init(){
        
        // 1. Make API call to load questions
        var link = "jsquizquestions";
        await fetch(link, { headers: { "Content-Type": "application/json; charset=utf-8" } })
     .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
     .then(response => {
         // 2. Create objects from JSON response
        let factory = new QuestionFactory();
        this.questions = factory.getQuestions(response);
     })
     .then(ready => {
         this.ready = true;
        
     })
     .catch(err => {
         console.log("Fetch found no results.");
         showModal("Sorry, we couldn't access the questions API.","","",true);

     });
    };
    
    async fetchAnswers(){
       
            // 1. Make API call to load answers
            var link = "jsquizanswers";
            await fetch(link, { headers: { "Content-Type": "application/json; charset=utf-8" } })
                .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
                .then(response => {
                  
                    // 2. Create objects from JSON response
                    let factory = new AnswerFactory();
                    this.answers = factory.getAnswers(response);
                    
                })
                .catch(err => {
                    console.log("Fetch found no results.");
                    showModal("Sorry, we couldn't access the answers api.");

                });
    };

    /*
    addQuestion(newQuestion) {
        this.questions.push(newQuestion);
    };

    addAnswer(newAnswer) {
        this.answers.push(newAnswer);
    };
*/
    gradebook(choices){
        let score = 0;
      
        // compare answers and choices
        this.answers.forEach((ans,index)=> {
          
            let choice = choices.find(el => el.id===ans.id);
           
            if(ans.answer === choice.choice){
                score++;
            }
        });

        return score;
    }


}

// VIEW
// QuizView handles all things DOM (Browser API) related.
// user events can be attached but event handling is not
// done in QuizView. QuizView's prime directive is to
// change state of what the user sees on the screen.
class QuizView {

    constructor(){
        this.id = "QuizView";
        this.qpanel = document.getElementById("question-panel");
        this.spanel = document.getElementById("code-panel");
        this.apanel = document.getElementById("answer-panel");
        this.popup = document.querySelector('.modal-popup');
        this.messageBox = document.querySelector('.modal-popup__text');
        this.modalh2 = document.querySelector('.modal-popup__h2');
        this.modalh3 = document.querySelector('.modal-popup__h3');
        this.clock = document.querySelector('.clock');
        this.btnQuiz = document.getElementById("btnQuiz");
        this.btnReplay = document.getElementById("btnReplay");
        this.radioList = new Array();

    };

	async init( btnQuizClickEventHandler, btnReplayClickEventHandler, controller ){
       
        // Attach event listeners...
        //this.btnQuiz.addEventListener("click", evt => controller.quizClick(evt));
        //this.btnReplay.addEventListener("click", evt => controller.replayClick(evt));
        this.btnQuiz.addEventListener("click", btnQuizClickEventHandler,true );
        this.btnReplay.addEventListener("click", btnReplayClickEventHandler, true);

        // Block user input with Loading screen...
        this.showModal("Initializing App...","<br /><i class=\"fas fa-cog fa-spin fa-5x\"></i>","Please Wait.", false);
       
    };

    destroy(btnQuizClickEventHandler, btnReplayClickEventHandler){
        
        //this.btnQuiz.removeEventListener("click", evt => controller.quizClick(evt));
        //this.btnReplay.removeEventListener("click", evt => controller.replayClick(evt));
        this.btnQuiz.addEventListener("click", btnQuizClickEventHandler,true);
        this.btnReplay.addEventListener("click", btnReplayClickEventHandler,true);

    };

    // return the clock element
    getClock(){
        return this.clock;
    };
    
    // Display the modal configured according to args where:
    // h2 is the major header
    // h3 is the minor header
    // msg is the display text
    // enableButtons to show or hide Play Again button
    showModal(h2, h3, msg, enableButtons) {

        this.popup.classList.add("display-modal");
        this.modalh2.innerHTML = h2;
        this.modalh3.innerHTML = h3;
        this.messageBox.innerHTML = this.paragraph(msg);

        if(enableButtons === true){
            this.btnReplay.classList.add("display-button");
        }
        else {
            this.btnReplay.classList.remove("display-button");
        }
    
    };

    hideModal(){
        this.popup.classList.remove("display-modal"); 
    };

    
    clearQuestion() {
        this.spanel.innerHTML = "";
        this.apanel.innerHTML = "";
        this.qpanel.innerHTML = "";
        
    };

    clearModal() {
        this.popup.innerHTML = "";
        this.messageBox.innerHTML = "";
    };

    reset(){
        this.clearQuestion();
        this.spanel.innerHTML = "<span>Welcome to the Javascript Quiz! <br />Press the <strong>Start Quiz</strong> button below to begin.</span>";
        this.showStartQuizButton();
     };

    async displayQuestion(questionObj) {
       
        this.qpanel.innerHTML = this.paragraph(questionObj.question);
        this.spanel.innerHTML = this.codeblock(questionObj.snippet);
        await this.listChoices(questionObj);
        
    };

    
// function to display the answer choices. re-write listAnswers depending on display type
async listChoices(questionObj) {
    
    var container = this.apanel;

    var node = document.createElement("DIV");
    node.id = "choices";

    // Build the list of choices
    questionObj.choices.forEach(this.buildChoicesList);

    container.append(node);
    
};

buildChoicesList(item, index) {
    
    let apanel = document.getElementById("answer-panel");
    appendRadioList(index, item, apanel);
    
    // Our radio buttons have css that overrides
    // built-in on/off display functionality. We
    // need to handle event wiring and on/off display
function appendRadioList(name, value, container) {
    
    var div = document.createElement("DIV");
    div.className = "radio-group";

    var input = document.createElement("INPUT");
    input.type = "radio";
    input.id = name;
    input.name = "radio-choice";
    //input.onchange = holdSelection; // can't pass "this" as arg
    input.setAttribute('onchange', 'quizController.userSelection(' + input.id + ')');
    //input.setAttribute('onchange', 'answer(this)');

    //s.charCodeAt(0) - 97 AND String.fromCharCode(97 + n)
    input.value = String.fromCharCode(97 + name);

    input.className = "radio-input";
    //if(name === 0) input.checked = true; // no default choice

    var label = document.createElement("LABEL");
    label.setAttribute("for", name);
    label.className = "radio-label";

    var span = document.createElement("SPAN");
    span.className = "radio-button";

    label.append(span);
    label.innerHTML = label.innerHTML + "&nbsp;" + value;

    div.append(input);
    div.append(label);

    container.append(div);
    
};
};

getRadioByIndex(index){

    // Get radios converting NodeList to Array with ES6 ...
    // functional equivilent to Array.from(.document.querySelectorAll('.radio-input'))
    const radioList = [...document.querySelectorAll('.radio-input')];
   
    return radioList.find(element => element.id == index);
};

showSubmitButton(){
    btnQuiz.innerHTML = "Submit Answer";
};

showStartQuizButton(){
    btnQuiz.innerHTML = "Start Quiz";
};

showScore(correct, count){
    // make final calculations and display score
    let percent = correct / count;
    let clock = this.getClock();
    
    this.showModal("You scored " + correct + " out of " + count, "( which is " + percent.toFixed(2) * 100 + "% )", "Time: " + clock.innerHTML,true);
};

    paragraph(str){
        return "<p>" + str + "</p>";
    };
    
    codeblock(str) {
        return "<code class='code'>" + str + '</code>';
    };



}


// CONTROLLER
// QuizController handles events and input, serving
// as mediator and "controller" for QuizView and QuizModel.
// client specific logic goes here.
class QuizController {

	constructor(quizView, quizModel) {
		this.quizView = quizView;
        this.quizModel = quizModel;
        this.ready = false;
        this.playing = false;
        this.selection = null;
        this._questions = new Array();
        this._answers = new Array();
        this._completed = new Array();
        this._choices = new Array();
        this.id = "QuizController";

         // bind event handlers for click events to 
        // this instance of QuizController click handlers
        this.bindQuizClick = this.quizClick.bind( this );
        this.bindReplayClick = this.replayClick.bind( this );
        
	};

	async init(){

        // call quizView init
        await this.quizView.init( this.bindQuizClick, this.bindReplayClick, this );
               
        this.gameClock = new GameClock(this.quizView.getClock());
        
        // fetch data asyncronously and wait...
        await this.quizModel.init();
               
        // unblock user interaction
        this.quizView.hideModal();
        this.ready = true;
              
    };

    // Closure to store user's selection when radio button clicked
    // is retrievable by accessing the closure getSelected which
    // is stored as an accessor on the controller.
    userSelection(selectedIndex) {
        let index = -1;
       
        if (selectedIndex !== -1){
            index = selectedIndex;
        }
        
        this.getSelected = function ( ){
            let selection = this.quizView.getRadioByIndex(index);
            return selection; 
        };
    };
    
    replayClick(){
        quizView.reset();
        this.reset();
    };

    quizClick(){
               
        if (!this.ready) { // fail fast
            return;
        }

        if (!this.playing) { // If we are starting the quiz...

            this.playing = true;
            this.quizView.showSubmitButton();
            this.gameClock.startTimer()();

        } else { // record user choice        
            
            try{ // Add current choice to user answer set
                
                let factory = new AnswerFactory();
                
                // Retrieve the last Question asked (current)
                let completed = this.completed;
                let lastElement = completed.length - 1;
                let questionId = this.questions[completed[lastElement]].id;
              
                 // Retrieve the last selection made (current)
                let selection = this.getSelected.call(this);
           
            if (typeof selection === "object") {

                // Store the user's choice for this question as an Answer type
                let element = JSON.parse('{"id":"' + questionId + '","answer":"z","choice": "' + selection.value + '"}');
                this.addChoice(factory.createAnswerFrom(element));
               
            } else {
                console.log("The user didn't answer a question, it wasn't recorded.");
                return;
            }
        }catch(err){
            console.log("Button Click Error: " + err);
        }
            
        }

        this.displayNextQuestion();
    };


    displayNextQuestion(){
        this.clearQuestion();
        this.quizView.displayQuestion(this.nextQuestion());
    };

    clearQuestion(){
        this.quizView.clearQuestion();
        this.selection = null;
    };

    nextQuestion() {

        let game = this;

        if (game.completed.length === game.questions.length) {
            game.endGame();
            return new Question(9999, "", "You have completed the quiz.", new Array());
        }

        function getQuestion() {
          
            let rnd = Math.floor(Math.random() * game.questions.length);

            // select a question that has not been asked
            if (game.completed.includes(rnd)) { // if already asked...

                return game.nextQuestion(); // get another question
            } else { // return question and record that its been asked
                game.addCompleted(rnd);
                return game.questions[rnd];
            }

        };

        return getQuestion();
    };

    async endGame(){
       
        // get the answer set
        await this.quizModel.fetchAnswers();
        let ans = await this.quizModel.answers;

        // score the responses
        
        let correct = this.quizModel.gradebook(this._choices);
        let count = ans.length;

        // display score to player
        quizView.showScore(correct,count);

        // stop game timer
        this.gameClock.stopTimer();
    };

    reset(){    
		// reset variables
        this.ready = false;
        this.playing = false;
        this.selection = null;
        this._questions = new Array();
        this._answers = new Array();
        this._completed = new Array();
        this._choices = new Array();     

        // remove event handlers
        quizView.destroy(this.bindQuizClick,this.bindReplayClick);

        // reset app
        this.quizModel = new QuizModel();
        this.quizView = new QuizView();
        this.init();
    };

    
    get completed() {
        return this._completed;
    };

    get questions() {
        return quizModel.questions;
    };
/*
    get answers() {
        return quizModel.answers;
    };

    get choices() {
        return this._choices;
    };
*/
    addChoice(newChoice) {
        this._choices.push(newChoice);
    };

    addCompleted(id) {
        this._completed.push(id);
    };

};

// Create View object from QuizView class
let quizView = new QuizView();

// Create Model object from QuizModel class
let quizModel = new QuizModel();

// Create a controller object and pass in View and Model
const quizController = new QuizController(quizView,quizModel);

// App started
quizController.init();



// DEBUGGING
var debugObj = function (msg, obj) { console.log(msg); console.log(Object.values(obj)); };
 
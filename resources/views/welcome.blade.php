

<!doctype html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <title>The JS Quizzer</title>
      <meta name="description" content="JS Quizzer">
      <meta name="author" content="Matthew Coatney">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Mono" rel="stylesheet">
      
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css" integrity="sha384-QokYePQSOwpBDuhlHOsX0ymF6R/vLk/UQVz3WHa6wygxI5oGTmDTv8wahFOSspdm" crossorigin="anonymous">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/fontawesome.css" integrity="sha384-vd1e11sR28tEK9YANUtpIOdjGW14pS87bUBuOIoBILVWLFnS+MCX9T6MMf0VdPGq" crossorigin="anonymous">

      <link rel="stylesheet" type="text/css" href="/css/app.css">
   </head>
   <body>
      <div class="container noselect">
         <div class="grid-item header">
            <div class="header__left">
               <span class="logo-svg"></span>
            </div>
            <div class="header__right">
               <span class="clock">0:00</span>
            </div>
         </div>
         <div id="question-panel" class="grid-item item1"></div>
         <div id="code-panel" class="grid-item item2"><span>Welcome to the Javascript Quiz! <br />Press the <strong>Start Quiz</strong> button below to begin.</span></div>
         <div id="answer-panel" class="grid-item item3">
         </div>
         <div class="grid-item footer">
            <button class="btn btn--primary btnQuiz display-button" id="btnQuiz">Start Quiz</button>
         </div>
         <div class="modal-popup" id="popup">
            <div class="modal-popup__content">
               <div class="modal-popup__left">
                  <span class="logo-svg"></span>
                  <h3 class="modal-popup__left--header">Javascript Coding</h3>
               </div>
               <div class="modal-popup__right">
                  <a href="/" class="modal-popup__close">&times;</a>
                  <h2 class="modal-popup__h2 heading-secondary u-margin-bottom-small">Congratulations You Survived The Test!</h2>
                  <h3 class="modal-popup__h3 heading-tertiary u-margin-bottom-small modal-popup__score-box">but did you pass?</h3>
                  <p class="modal-popup__text">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Sed sed risus pretium quam. Aliquam sem et tortor consequat id. Volutpat odio facilisis mauris sit
                     amet massa vitae. Mi bibendum neque egestas congue. Placerat orci nulla pellentesque dignissim enim
                     sit. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Malesuada pellentesque elit eget
                     gravida cum sociis natoque penatibus et. Proin fermentum leo vel orci porta non pulvinar neque laoreet.
                     Gravida neque convallis a cras semper. Pigstie at elementum eu facilisis sed odio morbi quis. Faucibus
                     vitae aliquet nec ullamcorper sit amet risus nullam eget. Nam libero justo laoreet sit. Amet massa
                     vitae tortor condimentum lacinia quis vel eros donec. Sit amet facilisis magna etiam. Imperdiet sed
                     euismod nisi porta.
                  </p>
                  <button class="btn btn--primary btnReplay" id="btnReplay">Play Again</button>
               </div>
            </div>
         </div>
      </div>
      <script type="text/javascript" src="/js/quiz.js"></script>
      <script type="text/javascript" src="/js/logo.js"></script>
      <script>
        
         
           
      </script>
   </body>
</html>


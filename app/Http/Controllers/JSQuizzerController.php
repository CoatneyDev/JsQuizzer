<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JSQuizzerController extends Controller
{

  public function quizanswers()
  {
    
    $data= \App\Question::select('id','answer')->get();

    //Log::debug("DEBUG ANSWERS: " . json_encode($data));

    return json_encode($data);
  }

  public function quizquestions()
  {
  
    // Get data from tblQuestions via Questions model

    $data = \App\Question::select('id','question','snippet','choices')->get();

    //Expecting '[{"id":"1","question":"string","snippet":"string",choices:["a","b","c","d","e"]},...]'
    //Log::debug("DEBUG QUESTIONS: " . json_encode($data));

    return json_encode($data);
  }
}

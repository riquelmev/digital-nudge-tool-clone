import React, { useState, setState, Component } from "react";
// import { View, FlatList, StyleSheet, Text, Dimensions } from "react-native";
// import * as React from 'react';  
import styles from "./App.css";
import getQuestions from './components/questions.js'
import getPrompts from "./components/medicalTexts";
// import getPopup from "./components/popup";
// import alertMode from "./components/alertMode";
import PopupAlert from "./components/popupAlert";
import { useParams } from "react-router-dom"
import getDisclaimer from "./components/disclaimer.js";

// import { BrowserRouter as Router } from 'react-router-dom';


function App({ chatgpt, popup }) {


  const [UsePopups, setUsePopups] = useState(popup);
  const [UseChatGPTDisclaimer, setUseChatGPTDisclaimer] = useState(chatgpt);

  // const handleChatGPT = () => setUseChatGPTDisclaimer(true)
  // const handlePopup = () => setUsePopups(true);

  // const [useFreq, setFreq] = useState(false);
  // const [freqCounter, setFreqCounter] = useState(0);


  // const handleFreq = () => {
  //   //Query Model to determine whether to show or not
  // }


  let { id } = useParams()

  // console.log(id)


  // Properties
  const [showResults, setShowResults] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPopups, setShowPopup] = useState(true);
  const [key] = useState(0);
  const responses = [];
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [acceptedOrNot, setAcceptedOrNot] = useState(false)

  const questions = getQuestions();
  const prompts = getPrompts();

  const post_disclaimer = getDisclaimer();

  // Helper Functions
  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);
  

  const disclaimer = " ChatGPT should not be used to make medical decisions."


  const scrollToTop = () => {
    console.log("scrolled")
    window.scrollTo({ top: 0});
    onClickNext()
  };

  // TODO: Change this func to record string of answer instead of id.
  const onClickNext = () => {
    console.log({ question_id: currentQuestion, answer_key: selectedAnswerIndex });
    localStorage.setItem(questions[currentQuestion].code, questions[currentQuestion].options[selectedAnswerIndex].text);
    // window.scrollTo({ top: 0});

    // scrollToTop();
    if (currentQuestion + 1 < prompts.length) {
      setCurrentQuestion(currentQuestion + 1);
      handleShow();
      setSelectedAnswerIndex(null);
      // console.log(showPopups);
    } else {
      setShowResults(true);
    }
  }

  class AnswerButton extends Component {
    onAnswerSelected() {
      setSelectedAnswerIndex(this.props.option.id)
    }

    render() {

      return (
        <li
          key={this.props.option.id}
          onClick={() => this.onAnswerSelected()}
          className={selectedAnswerIndex === this.props.option.id ? 'selected-answer' : null}
        >
          {this.props.option.text}
        </li>);

    }
  }

  /* Resets the game back to default */
  const restartGame = () => {
    // setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setSelectedAnswerIndex(null)
    handleShow();
  };

  const acceptedRestart = () => {
    // setScore(0);
    setCurrentQuestion(0);
    // setShowResults(false);
    setSelectedAnswerIndex(null)
    // handleShow();
    storeHistory();
    setShowEndScreen(true)
    setAcceptedOrNot(true)
  };

  const declinedRestart = () => {
    // setScore(0);
    setCurrentQuestion(0);
    // setShowResults(false);
    setSelectedAnswerIndex(null);
    // handleShow();
    setShowEndScreen(true)
  };

  



  const storeHistory = async () => {
    const history = {...localStorage};
    console.log(history);

    console.log("api call")
    const api_base_url='https://digital-nudge-server.onrender.com'
    const response = await fetch(`${api_base_url}/api/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify([id,history])
    });

    console.log(response)

    // const body = await response.text();

    localStorage.clear();

    // Push history to database

  }
  return (
    <div className="App">
      {/* 1. Header  */}
      <div className="title-box" id="title">
        <h1 className='title'> AI Reading Survey </h1>
      </div>


      {/* 2. Show finished page or show the question game  */}




      {showResults ? (
        // storeHistory(),
        /* 3. Final Results */
        <div className="final-results">
          {showEndScreen ? (
            <div> 
           <h1>Thank you for taking the survey!</h1>
           {acceptedOrNot ? (<h1>You have chosen to accept the terms and your response has been recorded.</h1>
):(<h1>You have chosen to not accept the terms. Your answers have not been recorded.</h1>)}
            </div>
          ):(
            <div className="disclaimer-box">
            <h2 className="disclaimer-text" style={{fontWeight: "bold"}}>
            Please don't believe anything we just showed you. 
            <br/><br/>
            </h2>
            <h3 className="disclaimer-text">
            {post_disclaimer}
            </h3>
        <button className="restart-button accept-button" onClick={() => acceptedRestart()}>I accept</button>
        <button className="restart-button reject-button" onClick={() => declinedRestart()}>I don't accept </button>
        </div>
          )}

        </div>
      ) : (
        [
          <div className="Main">
            <div className="main-box">
              <div className={styles.gptBox}>
                <div className="scenario-box">
                  <h2 className="scenario-text">Scenario {currentQuestion + 1} out of {prompts.length}:</h2>
                </div>
                <div className="prompt-box">
                  <div className="text-box">
                    <h2 className="gpt-text">{prompts[currentQuestion].prompt}</h2>
                  </div>
                  <div className="gpt-image"> <img src={require("./Person-bubble.jpeg")} alt="Person" style={{ maxWidth: 60 }}></img></div>
                </div>
                <div className="answer-box">
                  <div className="medical-text-box">
                    <div className="gpt-image"> <img src={require("./GPT-logo.jpeg")} alt="gpt Logo" style={{ maxWidth: 50 }}></img></div>
                    {UseChatGPTDisclaimer ? (<h3 className="gpt-text">{prompts[currentQuestion].text}{disclaimer} </h3>) : (<h3 className="gpt-text">{prompts[currentQuestion].text}</h3>)}

                  </div>
                </div>
              </div>
            </div>
          </div>,

          /* 5. Question Card  */
          <div className="question-card">
            {/* Current Question  */}
            <h2 className="question-text">
              Question: {currentQuestion + 1} out of {prompts.length}
            </h2>
            <h3 className="question-text">{questions[currentQuestion].text}</h3>

            {/* List of possible answers  */}
            <ul>
              {questions[currentQuestion].options.map((option) => {
                return (
                  <AnswerButton option={option} />
                );
              })}
            </ul>
            <div className="button-box">
              <button className="next-button" onClick={onClickNext} disabled={selectedAnswerIndex === null}> Next </button>
              <button onClick={scrollToTop}>Scroll to top</button>
            </div>
          </div>
        ])}

      {UsePopups ?
        (<PopupAlert showPopupMode={showPopups} closeModal={handleClose} openModal={handleShow} />
        ) : (null)}

    </div>

  );
}

export default App;
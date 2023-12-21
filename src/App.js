import React, { useState, setState, Component, useEffect } from "react";
// import { View, FlatList, StyleSheet, Text, Dimensions } from "react-native";
// import * as React from 'react';  
import styles from "./App.css";
import getQuestions from './components/questions.js'
import getPrompts from "./components/medicalTexts";
// import getPopup from "./components/popup";
// import alertMode from "./components/alertMode";
import PopupAlert from "./components/popupAlert";
import PopupConfirm from "./components/popupConfirm";
import { useParams } from "react-router-dom"
import getDisclaimer from "./components/disclaimer.js";
import getDemographicQuestions from "./components/demographic_questions";
import getStartPage from "./components/startPage";
import useIsTabVisible from "./components/tracker";
import { isVisible } from "dom-helpers";
import getRAGTexts from "./components/medicalTextsRAG";
import getTrialQuestions from "./components/trialQuestion";
import getAnswersMapped from "./components/answers_mapped";
// import { BrowserRouter as Router } from 'react-router-dom';


function App({ chatgpt, popup, rag}) {


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
  const [currentDemoQuestion, setCurrentDemoQuestion] = useState(0);
  const [showPopups, setShowPopup] = useState(true);
  const [showConfirmPopupAccept, setShowConfirmPopupAccept] = useState(false);
  const [showConfirmPopupDecline, setShowConfirmPopupDecline] = useState(false);

  // const [key] = useState(0);
  // const responses = [];
  // const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [selectedAnswerIndex2, setSelectedAnswerIndex2] = useState(null)
  const [selectedAnswerIndexLikert, setSelectedAnswerIndexLikert] = useState(null)

  const [acceptedOrNot, setAcceptedOrNot] = useState(false)

  const questions = getQuestions();
  const trial_questions = getTrialQuestions();
  const answers_mapped = getAnswersMapped();

  // const prompts = getRAGTexts();
  // const prompts = getPrompts();

  const whichPrompt = (rag) => {
    if (rag){
      return getRAGTexts();
    }
    else{
      return getPrompts();
    }
  }
  const prompts = whichPrompt(rag);

  console.log(prompts)

  const post_disclaimer = getDisclaimer();

  // Helper Functions
  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);


  const [showConfirmPopupAccept2, setShowConfirmPopupAccept2] = useState(false);
  const [showConfirmPopupDecline2, setShowConfirmPopupDecline2] = useState(false);

  const handleConfirmOpenAccept = () => setShowConfirmPopupAccept2(true);
  const handleConfirmCloseAccept = () => setShowConfirmPopupAccept2(false);

  const handleConfirmOpenDecline = () => setShowConfirmPopupDecline2(true);
  const handleConfirmCloseDecline = () => setShowConfirmPopupDecline2(false);


  const [demographics, setDemographics] = useState(true)
  const [showStartPage, setShowStartPage] = useState(true)
  const [showMiddlePage, setShowMiddlePage] = useState(false)
  const [endEarly, setShowEndEarly] = useState(false)
  const [showSecondPage, setShowSecondPage] = useState(false)
  const [leftTab, setLeftTab] = useState(false)
  const [trialQuestion, setShowTrialQuestion] = useState(false)
  const [useTrialPopup, setUseTrialPopup] = useState(false)
  const [showFirstConfirmationPopup, setFirstConfirmationPopup] = useState(false)
  const [showSecondConfirmationPopup, setSecondConfirmationPopup] = useState(false)
  const [currentTrialQuestion, setCurrentTrialQuestion] = useState(0)

  const handleCloseTrial = () => setUseTrialPopup(false);
  const handleCloseSecond = () =>  setDemographics(false);
  const handleCloseFirst = () => {
    setCurrentTrialQuestion(currentTrialQuestion + 1)
    setFirstConfirmationPopup(false)
  }

  const trialQuestions = getTrialQuestions();


  const completionCode = "46934"

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  const order = Array.from(Array(prompts.length).keys())
  const [randomArray, setRandomArray] = React.useState([])
    React.useEffect(function() {
    setRandomArray(shuffleArray(order))
    }, [])

  const likert_questions = 
    {
        code: "likert",
        text: "How trustworthy would you rate this answer?",
        options: answers_mapped["likert"]
    };

  
  console.log(randomArray)
  
  const start_disclaimer = `I am not a doctor, but I can offer some general information that may help you learn more about the subject 
   and perhaps make an informed decision`
  const disclaimer = `Keep in mind that guidelines and recommendations can change, and healthcare decisions 
  should be made in consultation with a qualified medical professional who is familiar with your specific health profile. ChatGPT is not a 
  a medical provider and is not qualified to give medical advice.`


  const demo_questions = getDemographicQuestions();


  const scrollToTop = () => {
    console.log("scrolled")
    window.scrollTo({ top: 0, behavior: "instant" });
    onClickNext()
  };

  // TODO: Change this func to record string of answer instead of id.
  const onClickNext = () => {
    console.log({ question_id: currentQuestion, answer_key: questions[randomArray[currentQuestion]].options[selectedAnswerIndex].text });
    console.log({ question_id: currentQuestion, answer_key: likert_questions.options[selectedAnswerIndex2].text });
    localStorage.setItem(questions[randomArray[currentQuestion]].code, questions[randomArray[currentQuestion]].options[selectedAnswerIndex].text);
    localStorage.setItem(questions[randomArray[currentQuestion]].code + "_likert", likert_questions.options[selectedAnswerIndexLikert].text);
    if (selectedAnswerIndex2 != null){
      localStorage.setItem(questions[randomArray[currentQuestion]].code + "_2", questions[randomArray[currentQuestion]].options2[selectedAnswerIndex2].text);
    }
    if (currentQuestion + 1 < prompts.length) {
      setCurrentQuestion(currentQuestion + 1);

      handleShow();
      setSelectedAnswerIndex(null);
      setSelectedAnswerIndex2(null);
      setSelectedAnswerIndexLikert(null);

    } else {
      setShowResults(true);
    }
  }

  function CheckVisible() {
    const visible = useIsTabVisible()
    if (!visible && !leftTab){
      setLeftTab(true)
    }
    // setLeftTab([...leftTab,visible])
    // console.log(leftTab)
    // console.log(visible)
  }
  CheckVisible()

  /// Add local storage logging to checkvisable at very end of survey



  const scrollToTopDemo = () => {
    console.log("scrolled")
    window.scrollTo({ top: 0, behavior: "instant" });
    onClickNextDemo()
  };

  // TODO: Change this func to record string of answer instead of id.
  const onClickNextDemo = () => {
    console.log({ question_id: demo_questions[currentDemoQuestion].code, answer_key: demo_questions[currentDemoQuestion].options[selectedAnswerIndex].text });
    localStorage.setItem(demo_questions[currentDemoQuestion].code, demo_questions[currentDemoQuestion].options[selectedAnswerIndex].text);

    if (currentDemoQuestion + 1 < demo_questions.length) {
      setCurrentDemoQuestion(currentDemoQuestion + 1);
      handleShow();
      setSelectedAnswerIndex(null);
      setSelectedAnswerIndex2(null);
      setSelectedAnswerIndexLikert(null);


    } else {
      setShowMiddlePage(true);
      setSelectedAnswerIndex(null);
      setSelectedAnswerIndex2(null);
      setSelectedAnswerIndexLikert(null);

    }
  } 


  const showSurvey = (answer) => {
    console.log("scrolled")
    window.scrollTo({ top: 0, behavior: "instant" });
    if (answer===true){
      if (currentTrialQuestion === 0){
        setFirstConfirmationPopup(true)
      }
      else{
        setSecondConfirmationPopup(true)
      }
    }
    else{
      setUseTrialPopup(true)
    }
    setSelectedAnswerIndex(null)
    setSelectedAnswerIndex2(null);
    setSelectedAnswerIndexLikert(null);

  }

  const showTrialQuestion = () => {
    setShowTrialQuestion(true)
    setSelectedAnswerIndex(null)
    setSelectedAnswerIndex2(null);
    setSelectedAnswerIndexLikert(null);

  }


  const beginSurvey = () => {
    setShowStartPage(false)
    setSelectedAnswerIndex(null)
    setSelectedAnswerIndex2(null);
    setSelectedAnswerIndexLikert(null);

  }
  const endSurvey = () => {
    setShowEndEarly(true)
    setSelectedAnswerIndex(null)
    setSelectedAnswerIndex2(null);
    setSelectedAnswerIndexLikert(null);


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

  class AnswerButtonLikert extends Component {
    onAnswerSelectedLikert() {
      setSelectedAnswerIndexLikert(this.props.option.id)
    }
    render() {

      return (
        <li
          key={this.props.option.id}
          onClick={() => this.onAnswerSelectedLikert()}
          className={selectedAnswerIndexLikert === this.props.option.id ? 'selected-answer' : null}
        >
          {this.props.option.text}
        </li>);

    }
  }

  
  class AnswerButtonSecond extends Component {
    onAnswerSelected2() {
      setSelectedAnswerIndex2(this.props.option.id)
    }

    render() {

      return (
        <li
          key={this.props.option.id}
          onClick={() => this.onAnswerSelected2()}
          className={selectedAnswerIndex2 === this.props.option.id ? 'selected-answer' : null}
        >
          {this.props.option.text}
        </li>);

    }
  }

  class MultiLineText extends Component {
    render() {
      return (
        <div>
          {this.props.text.map((i, key) => {
             if (UseChatGPTDisclaimer && 0 === key && this.props.medText) {
              // TODO: Add padding
              return <div className={this.props.className} key={key}>{start_disclaimer}{i}</div>;
            }
            else if (UseChatGPTDisclaimer && this.props.text.length - 1 === key && this.props.medText) {
              // TODO: Add padding
              return <div className={this.props.className} key={key}>{i}{disclaimer}</div>;
            }
            return <div className={this.props.className} key={key}>{i}</div>;
          })}
        </div>);
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


  const declinedstoreHistort = async () => {
    localStorage.clear();

    localStorage.setItem("id", id);
    localStorage.setItem("accepted", false)

    const history = { ...localStorage };


    const api_base_url='https://digital-nudge-server.onrender.com'
    const response = await fetch(`${api_base_url}/api/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify([id, history])
    });
  }




  const storeHistory = async () => {

    localStorage.setItem("leftTab", leftTab);
    localStorage.setItem("id", id);
    localStorage.setItem("accepted", true)


    const history = { ...localStorage };
    console.log(history);

    console.log("api call")

    const api_base_url='https://digital-nudge-server.onrender.com'
    const response = await fetch(`${api_base_url}/api/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify([id, history])
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
        <h1 className='title'> AI for Medical Information Study </h1>
      </div>


      {/* Show Start page  */}

      {/* Show Questions page  */}



      {showStartPage ? (
        <div>

          {endEarly ? (
            // End Screen
            <div>
              <h2 className="page-subtitle">You have chosen to not participate. Good day.</h2>
            </div>
          ) : (

            <div>
              {showSecondPage ? (
                // Explantion page
                [
                  <div className="page-box mini-box">
                    <h2 className="page-subtitle"> The following section of the survey consists of a couple demographic questions.</h2>
                    <div>
                      <button className="next-button" style={{ margin: 0 }} onClick={() => beginSurvey()}>Next</button>
                    </div>
                  </div>
                ]
              ) : (
                [
                  // Start screen
                  <div>
                    <h1 className="page-title">CONSENT SHEET</h1>
                    <h2 className="page-subtitle">University of Michigan HUM#00243219</h2>

                    <div className="page-box">
                      <div className="page-text-box">
                        <MultiLineText className="page-body-text" text={getStartPage()} medText={false}></MultiLineText>
                      </div>
                    </div>
                  </div>,
                  <div>
                    <button className="restart-button accept-button" onClick={() => setShowSecondPage(true)}>I accept</button>
                    <button className="restart-button reject-button" onClick={() => endSurvey()}>I don't accept </button>
                  </div>

                ]
              )}

            </div>


          )}

        </div>
      ) :

        (
          <div>
            {demographics ? (
              <div>
                {showMiddlePage ? (
                  <div>
                  {trialQuestion ? (
                    // Trial Question
                  [
                    <div className="Main">
                      <div className="main-box">
                        <div className={styles.gptBox}>
                          <div className="scenario-box">
                            <h2 className="scenario-text">Trial Question {currentTrialQuestion+1} out of 2</h2>
                          </div>
                          <div className="prompt-box">
                            <div className="text-box">
                              <h2 className="gpt-text">{trial_questions[currentTrialQuestion].prompt}</h2>
                            </div>
                            <div className="gpt-image"> <img src={require("./Person-bubble.jpeg")} alt="Person" style={{ maxWidth: 60 }}></img></div>
                          </div>
                          <div className="answer-box">
                            <div className="medical-text-box">
                              <div className="gpt-image"> <img src={require("./GPT-logo.jpeg")} alt="gpt Logo" style={{ maxWidth: 50 }}></img></div>
                              {/* {UseChatGPTDisclaimer ? (<h3 className="gpt-text">{prompts[currentQuestion].text}{disclaimer} </h3>) : (<h3 className="gpt-text">{prompts[currentQuestion].text}</h3>)} */}
                              <div>
                                <MultiLineText className="text-chunk" text={trial_questions[currentTrialQuestion].chatGPT_answer} medText={true} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>,

                    /* 5. Question Card  */
                    <div className="question-card">
                      {/* Current Question  */}
                      <h2 className="question-text">
                        Question: {currentTrialQuestion + 1} out of {trial_questions.length}
                      </h2>
                      {/* EDIT HERE TO ADD PARARGRAPHS FOR EACH STR IN ARR */}
                      <h3 className="question-text">{trial_questions[currentTrialQuestion].text}</h3>

                      {/* List of possible answers  */}
                      <ul>
                        {trial_questions[currentTrialQuestion].options.map((option) => {
                          return (
                            <AnswerButton option={option} />
                          );
                        })}
                      </ul>
                      <h3 className="question-text">{"How would you rate the trustworthyness of the above passage?"}</h3>

                      <ul>
                        {likert_questions.options.map((option) => {
                          return (
                            <AnswerButtonLikert id={"trust"} option={option} />
                          );
                        })}
                      </ul>
                      <div className="button-box">
                        <button className="next-button" onClick={() => showSurvey(selectedAnswerIndex === 2)} disabled={selectedAnswerIndex === null || selectedAnswerIndexLikert === null}> Next </button>
                      </div>
                    
                      <PopupAlert showPopupMode={useTrialPopup} closeModal={handleCloseTrial} openModal={handleShow} text={"Hmm, that doesn't seem quite right. Please try again."}></PopupAlert>

                        
                      <PopupAlert showPopupMode={showFirstConfirmationPopup} closeModal={handleCloseFirst} openModal={handleShow} text={"Nice Job. There's one more trial question."} ></PopupAlert>
  
                      <PopupAlert showPopupMode={showSecondConfirmationPopup} closeModal={handleCloseSecond} openModal={handleShow} text={"Nice Job. Click continue to begin the survey. Please note there will be no confirmation pop up in the actual survey."} ></PopupAlert>

                    </div>
                   
                  ]

                  ) : (
                    // Finished Demographics
                  <div className="page-box mini-box">
                    <h2 className="page-subtitle">Thank you for filling out the demographic portion of the survey. In the following section, you'll see conversation with an AI Agent,
                      followed by some questions. The conversation shown contains AI generated information. Please fill out the questions to the best of your ability and outside knowledge. There will be 2 practice questions to help you get acclimated.</h2>
                    <div>
                      <button className="next-button" style={{ margin: 0 }} onClick={showTrialQuestion} > Next </button>
                    </div>
                  </div>) }

                  </div>
                
                ) : (
                  // Demographic Questions

                  <div className="question-card">
                    {/* Current Question  */}
                    <h2 className="question-text">
                      Question: {currentDemoQuestion + 1} out of {demo_questions.length}
                    </h2>
                    {/* EDIT HERE TO ADD PARARGRAPHS FOR EACH STR IN ARR */}
                    <h3 className="question-text">{demo_questions[currentDemoQuestion].text}</h3>

                    {/* List of possible answers  */}
                    <ul>
                      {demo_questions[currentDemoQuestion].options.map((option) => {
                        return (
                          <AnswerButton option={option} />
                        );
                      })}
                    </ul>
                    <div className="button-box">
                      <button className="next-button" onClick={scrollToTopDemo} disabled={selectedAnswerIndex === null}> Next </button>
                    </div>
                  </div>
                )}
              </div>

            ) : (

              <div>
                {showResults ? (
                  // storeHistory(),
                  /* 3. Final Results */
                  <div /* className="final-results"*/ >
                    {showEndScreen ? (
                      <div className="page-box">
                        <h1 className="page-title">Thank you for taking the survey!</h1>
                        {acceptedOrNot ? (<h2 className="page-subtitle"> You have chosen to accept the terms and your response has been recorded. Your completion code is {completionCode}</h2>
                        ) : (<h2 className="page-subtitle">You have chosen to not accept the terms. Your answers have not been recorded. Your completion code is {completionCode}</h2>)}
                      </div>
                    ) : (

                      <div>
                        <div className="page-box">
                          <h2 className="page-subtitle">
                            Please read the following in its entirety.
                          </h2>
                          <div className="page-text-box">
                            <MultiLineText className="page-body-text" text={post_disclaimer} medText={false}></MultiLineText>
                          </div>
                        </div>
                        <button className="restart-button accept-button" onClick={handleConfirmOpenAccept}>I accept</button>
                        <button className="restart-button reject-button" onClick={handleConfirmOpenDecline}>I don't accept </button>

                        <PopupConfirm showPopupMode={showConfirmPopupAccept2} acceptModal={acceptedRestart} closeModal={handleConfirmCloseAccept} text={"You have clicked to particapte in this study. Is this correct?"}></PopupConfirm>
                        <PopupConfirm showPopupMode={showConfirmPopupDecline2} acceptModal={declinedRestart} closeModal={handleConfirmCloseDecline} text={"You have clicked to NOT particapte in this study. Is this correct?"}></PopupConfirm>

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
                              <h2 className="gpt-text">{prompts[randomArray[currentQuestion]].prompt}</h2>
                            </div>
                            <div className="gpt-image"> <img src={require("./Person-bubble.jpeg")} alt="Person" style={{ maxWidth: 60 }}></img></div>
                          </div>
                          <div className="answer-box">
                            <div className="medical-text-box">
                              <div className="gpt-image"> <img src={require("./GPT-logo.jpeg")} alt="gpt Logo" style={{ maxWidth: 50 }}></img></div>
                              {/* {UseChatGPTDisclaimer ? (<h3 className="gpt-text">{prompts[currentQuestion].text}{disclaimer} </h3>) : (<h3 className="gpt-text">{prompts[currentQuestion].text}</h3>)} */}
                              <div>
                                <MultiLineText className="text-chunk" text={prompts[randomArray[currentQuestion]].text} medText={true} />
                              </div>
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


                      {/* Question 1 */}
                      <h3 className="question-text">{questions[randomArray[currentQuestion]].text}</h3>

                      {/* List of possible answers  */}
                      <ul>
                        {questions[randomArray[currentQuestion]].options.map((option) => {
                          return (
                            <AnswerButton id={"comp"} option={option} />
                          );
                        })}
                      </ul>
                  
                      {/* Question 2 */}
                      <h3 className="question-text">{questions[randomArray[currentQuestion]].text2}</h3>
                      <ul>
                        {questions[randomArray[currentQuestion]].options2.map((option) => {
                          return (
                            <AnswerButtonSecond id={"comp"} option={option} />
                          );
                        })}
                      </ul>
                      <h3 className="question-text">{"How would you rate the trustworthyness of the above passage?"}</h3>

                      <ul>
                        {likert_questions.options.map((option) => {
                          return (
                            <AnswerButtonLikert id={"trust"} option={option} />
                          );
                        })}
                      </ul>
                      <div className="button-box">
                        <button className="next-button" onClick={scrollToTop} disabled={selectedAnswerIndex === null || selectedAnswerIndex2 === null || selectedAnswerIndexLikert === null}> Next </button>
                      </div>
                    </div>
                  ])}

                {UsePopups ?
                  (<PopupAlert showPopupMode={showPopups} closeModal={handleClose} openModal={handleShow} text={"ChatGPT sometimes writes plausible-sounding but incorrect answers. Does this information seem accurate?"} />
                  ) : (null)}
              </div>

            )

            }

          </div>)}




    </div>

  );
}

export default App;

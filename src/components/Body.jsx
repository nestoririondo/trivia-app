import { TRIVIA_API } from "../constants/apis";
import { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import "./Body.css";

const MAX_QUESTIONS = 10;

const getQuestions = async (setQuestions) => {
  try {
    const response = await axios.get(`${TRIVIA_API}&limit=${MAX_QUESTIONS}`);
    setQuestions(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const Body = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getQuestions(setQuestions);
  }, []);

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    getQuestions();
  };

  return (
    <>
      {questions.length > 0 && currentQuestionIndex !== MAX_QUESTIONS - 1 && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setAnswers={setAnswers}
        />
      )}
        {currentQuestionIndex === 9 && (
          <button onClick={handleRestart}>Restart</button>
        )}
      <div className="answers">
        {answers.map((answer) => (
          <div className={`answer-box ${answer}`}></div>
        ))}
      </div>
    </>
  );
};

export default Body;

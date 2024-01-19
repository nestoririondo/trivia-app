import { TRIVIA_API } from "../constants/apis";
import { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import "./Body.css";

const MAX_QUESTIONS = 10;

const getQuestions = async (setQuestions, setLoading) => {
  try {
    const response = await axios.get(`${TRIVIA_API}&limit=${MAX_QUESTIONS}`);
    setQuestions(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false)
  }
};

const Body = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [games, setGames] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getQuestions(setQuestions, setLoading);
  }, [games]);

  const handleRestart = () => {
    setLoading(true)
    setCurrentQuestionIndex(0);
    setAnswers([])
    setGames(games+1)
  };

  return (
    <>
      {!loading && questions.length > 0 && currentQuestionIndex !== MAX_QUESTIONS && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setAnswers={setAnswers}
        />
      )}
        {currentQuestionIndex === 10 && (
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

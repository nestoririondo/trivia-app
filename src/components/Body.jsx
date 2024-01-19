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
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const Body = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [games, setGames] = useState(0);
  const [points, setPoints] = useState(0);
  const [averagePoints, setAveragePoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions(setQuestions, setLoading);
    setAveragePoints(points / games);
  }, [games]);

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <>
      <div className="content">
        {loading ? <div>Loading...</div> : null}
        {!loading &&
          questions.length > 0 &&
          currentQuestionIndex !== MAX_QUESTIONS && (
            <QuestionCard
              question={questions[currentQuestionIndex]}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              setAnswers={setAnswers}
              setPoints={setPoints}
              setGames={setGames}
            />
          )}
        {currentQuestionIndex === 10 && (
          <button className="restart-btn" onClick={handleRestart}>
            Restart
          </button>
        )}
        <div className="answers">
          {answers.map((answer, index) => (
            <div key={index} className={`answer-box ${answer}`}></div>
          ))}
        </div>
      </div>
      {games >= 1 && (
        <div className="games-container">
          <div className="games">
            <div className="played">Games played: {games}</div>
            <div className="average">
              Average points: {averagePoints.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Body;

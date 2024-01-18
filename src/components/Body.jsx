import { TRIVIA_API } from "../constants/apis";
import { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";

const getQuestions = async (setQuestions) => {
  try {
    const response = await axios.get(TRIVIA_API);
    setQuestions(response.data.results);
  } catch (error) {
    console.log(error);
  }
};

const Body = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    getQuestions(setQuestions);
  }, []);

  return (
    <>
      {questions.length > 0 && currentQuestionIndex !== 9 && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setCorrectAnswers={setCorrectAnswers}
        />
      )}
      <div>
        Correct answers: {correctAnswers} / {currentQuestionIndex + 1}
      </div>
    </>
  );
};

export default Body;

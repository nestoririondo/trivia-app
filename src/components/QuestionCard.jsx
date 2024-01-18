import { shuffle } from "../utils/arrays";

const QuestionCard = ({
  question,
  setCurrentQuestionIndex,
  setCorrectAnswers,
}) => {
  let answers = shuffle([
    ...question.incorrect_answers.map((answer) => ({
      text: answer,
      correct: false,
    })),
    { text: question.correct_answer, correct: true },
  ]);

  let formattedQuestion = question.question.replace(/&quot;/g, '"');

  const handleAnswerClick = (answer) => {
    answer.correct ? setCorrectAnswers((prev) => prev + 1) : null;
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="question">
      <div>{formattedQuestion}</div>
      {answers.map((answer, index) => (
        <button key={index} onClick={()=>handleAnswerClick(answer)}>
          {answer.text}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;

import { shuffle } from "../utils/arrays";

const QuestionCard = ({ question, setCurrentQuestionIndex, setAnswers }) => {
  let answers = shuffle([
    ...question.incorrectAnswers.map((answer) => ({
      text: answer,
      correct: false,
    })),
    { text: question.correctAnswer, correct: true },
  ]);

  let formattedQuestion = question.question.replace(/&quot;/g, '"');

  const handleAnswerClick = (answer) => {
    answer.correct
      ? setAnswers((prev) => [...prev, "correct"])
      : setAnswers((prev) => [...prev, "incorrect"]);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="question">
      <div className="question-text">{formattedQuestion}</div>
      <div className="question-answers">
        {answers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerClick(answer)}>
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;

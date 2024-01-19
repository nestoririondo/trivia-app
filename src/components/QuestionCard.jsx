import { shuffle } from "../utils/arrays";

const QuestionCard = ({
  question,
  setCurrentQuestionIndex,
  setAnswers,
  setPoints,
  setGames
}) => {
  let answers = shuffle([
    ...question.incorrectAnswers.map((answer) => ({
      text: answer,
      correct: false,
    })),
    { text: question.correctAnswer, correct: true },
  ]);

  let formattedQuestion = question.question.replace(/&quot;/g, '"');

  const handleAnswerClick = (answer) => {
    if (answer.correct) {
      setAnswers((prev) => [...prev, "correct"]);
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setAnswers((prev) => [...prev, "incorrect"]);
    }
    setCurrentQuestionIndex((prev) => {
      if (prev + 1 === 10) {
        setGames((prevGames) => prevGames + 1);
      }
      return prev + 1;
    });
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

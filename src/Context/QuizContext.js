// QuizContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fine-rose-clownfish-garb.cyclic.app/quizzes/65786397e7b5a3b9ab1d504d"
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Erro ao obter perguntas:", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  function getCurrentQuestion() {
    if (questions && questions.questions && questions.questions.length > 0) {
      return questions.questions[currentQuestionIndex];
    }
    return null;
  }

  function handleNextQuestion() {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }

  function handlePrevQuestion() {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }

  function handleAnswer(selectedOptionIndex) {
    const currentQuestion = getCurrentQuestion();

    if (currentQuestion) {
      setUserAnswers((prevAnswers) => {
        const existingAnswerIndex = prevAnswers.findIndex(
          (answer) => answer.questionId === currentQuestion._id
        );

        if (existingAnswerIndex !== -1) {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[existingAnswerIndex].selectedOptionIndex =
            selectedOptionIndex;

          return updatedAnswers;
        } else {
          return [
            ...prevAnswers,
            { questionId: currentQuestion._id, selectedOptionIndex },
          ];
        }
      });
    }
  }

  async function handleSendQuiz(name, navigate) {
    try {
      const answersToSend = userAnswers.map((answer) => ({
        _questionID: answer.questionId,
        _optionID: answer.selectedOptionIndex.toString(),
      }));

      const response = await axios.post(
        "https://fine-rose-clownfish-garb.cyclic.app/answers/createAnswer",
        {
          name,
          answers: answersToSend,
        }
      );
      setShowResults(true);

      console.log("Resposta do backend:", response.data);
    } catch (error) {
      console.error("Erro ao enviar as respostas:", error);
    }
  }

  function resetQuiz() {
    console.log("Before reset:", currentQuestionIndex, userAnswers);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    console.log("After reset:", currentQuestionIndex, userAnswers);
    navigate("/");
    window.location.reload();
  }

  const value = {
    questions,
    currentQuestion: getCurrentQuestion(),
    currentQuestionIndex,
    userAnswers,
    loading,
    initialLoading,
    handleNextQuestion,
    handlePrevQuestion,
    handleAnswer,
    handleSendQuiz,
    resetQuiz,
    showResults,
    setShowResults,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export default QuizContext;

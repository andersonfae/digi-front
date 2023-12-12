import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuizContext } from "../../Context/QuizContext";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";

function Quiz() {
  const {
    currentQuestion,
    currentQuestionIndex,
    userAnswers,
    handleNextQuestion,
    handlePrevQuestion,
    handleAnswer,
    resetQuiz,
    questions,
    handleSendQuiz,
    setShowResults,
    showResults,
    selectedOptionIndex,
    setSelectedOptionIndex,
  } = useQuizContext();

  const location = useLocation();
  const userName = location.state && location.state.name;

  const [quizVisible, setQuizVisible] = useState(true);

  async function sendQuiz() {
    try {
      if (userAnswers[currentQuestionIndex] !== undefined) {
        setShowResults(true);
        setQuizVisible(false);

        await handleSendQuiz(userName);
      } else {
        console.warn("Por favor, responda à pergunta antes de avançar.");
      }
    } catch (error) {
      console.error("Erro ao enviar as respostas:", error);
    }
  }

  function resetAndShowQuiz() {
    setQuizVisible(true);
    resetQuiz();
  }

  function compartilharWhats() {
    const mensagem = `Parabéns ${userName}! ${calculateResultMessage()}`;

    const mensagemEncoded = encodeURIComponent(mensagem);

    const linkWhatsapp = `https://wa.me/?text=${mensagemEncoded}`;

    window.open(linkWhatsapp, "_blank");
  }

  function calculateResultMessage() {
    const majorityA = userAnswers.filter(
      (answer) => answer.selectedOptionIndex === 0
    ).length;
    const majorityB = userAnswers.filter(
      (answer) => answer.selectedOptionIndex === 1
    ).length;
    const majorityC = userAnswers.filter(
      (answer) => answer.selectedOptionIndex === 2
    ).length;

    if (majorityA > majorityB && majorityA > majorityC) {
      return "Você é o Mestre do Engajamento! Seu conhecimento e habilidade em reconhecer talentos e planejar estratégias são impecáveis. A Digi tem um agente secreto especial aqui!";
    } else if (majorityB > majorityA && majorityB > majorityC) {
      return "Hora de afinar suas habilidades! A boa notícia é que a Digi tem todas as ferramentas e expertise para transformar você em um pro do engajamento.";
    } else {
      return "Você está no caminho certo! Com seu entusiasmo e conhecimento, só precisa de um empurrãozinho da Digi para atingir o topo.";
    }
  }

  return (
    <div
      className={`p-4 sm:p-20 ${
        showResults
          ? "text-black bg-[#F8DE6E] h-full min-h-screen border-8 border-[#3706EF]"
          : "bg-black h-full min-h-screen border-8 border-[#FF0145]"
      }`}
    >
      <Hero />
      {quizVisible && (
        <>
          <h2 className="text-white text-2xl sm:text-4xl font-normal mt-4 sm:mt-10">
            Uma pergunta à ser respondida
          </h2>
          {currentQuestion && (
            <div>
              <h3 className="text-white text-xl sm:text-2xl font-normal py-4">
                {currentQuestion.text}
              </h3>
              <ul className="text-white text-base sm:text-lg">
                {currentQuestion.options.map((option, index) => (
                  <li key={index} className="p-1 my-2">
                    <label className="p-1 lg:border-2 lg:border-[#520EDD]">
                      <input
                        type="radio"
                        name="answer"
                        className=""
                        checked={selectedOptionIndex === index}
                        onChange={() => {
                          handleAnswer(index);
                          setSelectedOptionIndex(index); // Adicione esta linha para atualizar o estado
                        }}
                      />
                      <span className="ml-2">{option.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h1 className="text-white text-base sm:text-lg">
            {currentQuestionIndex + 1}/5
          </h1>
          <div className="text-white">
            {userAnswers.length > 0 && currentQuestion && (
              <p>
                Você respondeu:{" "}
                {currentQuestion.options &&
                  currentQuestion.options[
                    userAnswers[currentQuestionIndex]?.selectedOptionIndex
                  ]?.text}
              </p>
            )}
            {currentQuestionIndex < questions.questions.length - 1 &&
              userAnswers[currentQuestionIndex] !== undefined && (
                <button
                  onClick={handleNextQuestion}
                  className="text-white text-base sm:text-lg font-bold uppercase px-4 sm:px-7 py-2 sm:py-5 bg-violet-700"
                >
                  Continuar
                </button>
              )}
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevQuestion}
                className="ml-2 sm:ml-4 text-white text-base sm:text-lg font-bold uppercase px-2 sm:px-3.5 opacity-50 border-b border-white"
              >
                Anterior
              </button>
            )}
            {currentQuestionIndex === questions.questions.length - 1 && (
              <button
                onClick={sendQuiz}
                className="ml-2 sm:ml-4 text-white text-base sm:text-lg font-bold uppercase px-4 sm:px-7 py-2 sm:py-5 bg-violet-700"
              >
                Enviar
              </button>
            )}
          </div>
        </>
      )}
      {showResults && (
        <div className="text-white">
          <span className="my-2 text-black text-base sm:text-2xl">
            Parabéns {userName}
          </span>
          <p className="mb-4 sm:mb-10 text-black text-base sm:text-3xl font-normal">
            {calculateResultMessage()}
          </p>
          <button
            onClick={resetAndShowQuiz}
            className="text-white text-base sm:text-lg font-bold uppercase px-4 sm:px-7 py-2 sm:py-5 bg-violet-700"
          >
            Fazer Novamente
          </button>
          <button
            onClick={compartilharWhats}
            className="ml-2 sm:ml-4 text-black text-base sm:text-lg font-bold uppercase px-2 sm:px-3.5 border-b border-black mt-10"
          >
            Compartilhar no Whatsapp 😎
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Quiz;

// Routes.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import { QuizProvider } from "./Context/QuizContext";

const AppRoutes = () => {
  return (
    <Router>
      <QuizProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </QuizProvider>
    </Router>
  );
};

export default AppRoutes;

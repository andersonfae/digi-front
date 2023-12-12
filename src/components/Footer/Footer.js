import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Footer({ showResults }) {
  const location = useLocation();
  const [isQuizPage, setIsQuizPage] = useState(false);

  useEffect(() => {
    setIsQuizPage(location.pathname === "/quiz");
  }, [location.pathname]);

  return (
    <footer
      className={`flex p-5 mb-5 justify-between fixed bottom-0 items-center h-16 w-[98%] ${
        showResults ? "text-black" : "text-white"
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="white-text text-base">Digi® – </span>
        <span className="gray-text text-base opacity-60">
          Boosting people for performance
        </span>
      </div>
      <div className="">
        <img src="/logoFundo.svg" alt="Logo" className="w-14 h-14" />
      </div>
    </footer>
  );
}

export default Footer;

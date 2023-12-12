// Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";

function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/Quiz", { state: { name } });
  };

  return (
    <div className="text-center p-4 sm:p-20 bg-black h-full min-h-screen border-8 border-[#FF0145]">
      <Hero />
      <h1 className="text-2xl sm:text-4xl mb-4 sm:mb-10 text-white mt-10">
        Como posso te chamar?
      </h1>
      <div className="input-container mb-4 sm:mb-10">
        <input
          type="text"
          placeholder="Seu nome"
          className="input p-1 w-full sm:w-96 border-2 border-purple-700 text-black"
        />
      </div>
      <button
        onClick={handleStart}
        className="px-4 sm:px-10 py-2 bg-purple-700 text-white cursor-pointer text-lg sm:text-xl font-bold uppercase tracking-wide"
      >
        Iniciar
      </button>
      <div className="content flex-1"></div>
      <Footer />
    </div>
  );
}

export default Home;

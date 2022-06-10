import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const HomePage = () => {
  const navigate = useNavigate();

  const { auth } = useAuth();

  const getStartedBtnHandler = () => {
    auth.isLoggedIn ? navigate("/tasks") : navigate("/login");
  };
  return (
    <>
      <main className="main-landing grid grid-cols-2">
        <div className="left-landing-container flex justify-center">
          <div className="left-cta-container w-3/4 mt-32 flex flex-col items-start">
            <h1 className="text-6xl font-bold text-teal-100 text-left">
              Track your Productivity
            </h1>
            <h1 className="text-6xl font-bold text-teal-400 text-left">
              With Potato Clock
            </h1>

            <button
              onClick={() => getStartedBtnHandler()}
              className="bg-cyan-600 text-white font-bold px-12 py-4 rounded-3xl rounded-br-none mt-16 ml-12"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="right-landing-container flex flex-row items-center justify-center">
          <img src="/assets/potato.svg" className="h-[36rem]" alt="" />
        </div>
      </main>
    </>
  );
};

export default HomePage;

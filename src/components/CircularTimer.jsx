import React from "react";
import { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

const CircularTimer = ({
  remainingTime,
  isBreak,
  setIsBreak,
  setIsPaused,
  setCurrentTime,
  time,
}) => {
  const [breakCurrentTime, setBreakCurrentTime] = useState(300);
  const [isPausedBreak, setIsPausedBreak] = useState(true);

  useEffect(() => {
    if (!isPausedBreak) {
      const breakIntervalId = setInterval(() => {
        if (breakCurrentTime > 0) {
          setBreakCurrentTime((second) => second - 1);
        }
      }, 1000);
      return () => clearInterval(breakIntervalId);
    }
  }, [breakCurrentTime, isPausedBreak]);

  return (
    <div className="flex flex-col items-center">
      <div className="timer-container w-1/2">
        <CircularProgressbar
          value={breakCurrentTime}
          maxValue={300}
          minValue={0}
          text={remainingTime(breakCurrentTime)}
          styles={buildStyles({
            pathColor: "#F1B814",
            textColor: "#F1B814",
            textSize: "18px",
          })}
        />
      </div>
      <div className="timer-play-buttons-container flex gap-8 items-center mt-8">
        {isPausedBreak ? (
          <button
            onClick={() => setIsPausedBreak(false)}
            className="text-5xl text-teal-400"
          >
            <FaPlayCircle />
          </button>
        ) : (
          <button
            onClick={() => setIsPausedBreak(true)}
            className="text-5xl text-teal-400"
          >
            <FaPauseCircle />
          </button>
        )}
        <button
          onClick={() => {
            setIsPausedBreak(true);
            setBreakCurrentTime(300);
          }}
          className="text-xl bg-teal-400 text-slate-800 px-3 py-3 rounded-full"
        >
          <VscDebugRestart />
        </button>
      </div>
      <div className="restart-btn-container mt-4">
        {isBreak ? (
          <button
            onClick={() => setIsBreak(false)}
            className="text-lg text-white  from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  border border-cyan-600  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3"
          >
            Focus
          </button>
        ) : (
          <button
            onClick={() => {
              setIsBreak(true);
            }}
            className="text-lg text-white  from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  border border-cyan-600  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3"
          >
            Break
          </button>
        )}
      </div>
    </div>
  );
};

export default CircularTimer;

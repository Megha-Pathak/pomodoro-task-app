import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { useTask } from "../context/task-context";
import CircularTimer from "../components/CircularTimer";

const SingleTask = () => {
  const { taskId } = useParams();

  const { tasks } = useTask();

  const findTask = tasks.find((task) => task._id === taskId);

  const [myTask, setMyTask] = useState(findTask);

  const [time, setTime] = useState(Number(myTask.time) * 60);
  const [currentTime, setCurrentTime] = useState(time);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  const remainingTime = (seconds) => {
    const remainingMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${remainingMinutes}m : ${remainingSeconds}s`;
  };

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        if (currentTime > 0) {
          setCurrentTime((second) => second - 1);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [currentTime, isPaused]);

  return (
    <>
      <div className="task-container bg-cyan-600 px-24 pt-16 pb-16 mx-8 my-4">
        <div className="my-task-container grid grid-cols-2 rounded-2xl bg-slate-800 border-teal-400">
          <div className="task-timer-container px-4 pt-16 pb-4 flex flex-col items-center">
            {isBreak ? (
              <CircularTimer
                time={time}
                setCurrentTime={setCurrentTime}
                setIsPaused={setIsPaused}
                isBreak={isBreak}
                setIsBreak={setIsBreak}
                remainingTime={remainingTime}
              />
            ) : (
              <div className="flex flex-col items-center">
                <div className="timer-container w-2/3">
                  <CircularProgressbar
                    value={currentTime}
                    maxValue={time}
                    minValue={0}
                    text={remainingTime(currentTime)}
                    styles={buildStyles({
                      pathColor: "#ca4b74",
                      textColor: "#ca4b74",
                      textSize: "10px",
                    })}
                  />
                </div>
                <div className="timer-play-buttons-container flex gap-8 items-center mt-8">
                  {isPaused ? (
                    <button
                      onClick={() => setIsPaused(false)}
                      className="text-5xl text-cyan-400"
                    >
                      <FaPlayCircle />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsPaused(true)}
                      className="text-5xl text-cyan-400"
                    >
                      <FaPauseCircle />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsPaused(true);
                      setCurrentTime(time);
                    }}
                    className="text-xl bg-cyan-400 text-slate-800 px-3 py-3 rounded-full"
                  >
                    <VscDebugRestart />
                  </button>
                </div>
                <div className="restart-btn-container mt-4">
                  {isBreak ? (
                    <button
                      onClick={() => setIsBreak(false)}
                      className=" font-semibold rounded-lg px-5 py-2 border-2 border-cyan-400 text-cyan-400"
                    >
                      Focus
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsBreak(true)}
                      className=" font-semibold rounded-lg px-5 py-2 border-2 border-cyan-400 text-cyan-400"
                    >
                      Break
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="task-details-container px-4 pt-16 pb-4">
            <p className="task-title text-3xl font-bold text-left text-teal-400">
              {myTask.title}
            </p>
            <p className="task-description-container text-lg font-medium text-left mt-4 text-cyan-500">
              {myTask.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTask;

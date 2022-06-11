import React from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../context/auth-context";
import { useTask } from "../context/task-context";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const { tasks, createTask, deleteTask, editTask } = useTask();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    time: "",
    isDone: false,
  });

  const [isEditingTask, setIsEditingTask] = useState({
    editing: false,
    editingTaskId: "",
  });

  const addTaskHandler = () => {
    setTaskData({
      title: "",
      description: "",
      time: "",
      isDone: false,
    });
    setShowAddTaskModal(false);

    isEditingTask.editing
      ? editTask(isEditingTask.editingTaskId, taskData)
      : createTask(taskData);
  };

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  return (
    <>
      {showAddTaskModal && (
        <div className="addTaskModalBackground h-screen w-screen fixed flex justify-center items-center z-10">
          <div className="addTaskModalContainer rounded-xl p-4 mb-56 bg-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTaskHandler();
              }}
              className="flex flex-col gap-4"
            >
              <button
                className="ml-auto text-2xl text-cyan-400"
                onClick={() => setShowAddTaskModal(false)}
              >
                <AiOutlineClose />
              </button>
              <input
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                value={taskData.title}
                required
                type="text"
                name=""
                id=""
                placeholder="Add Title"
              />
              <textarea
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setTaskData({ ...taskData, description: e.target.value })
                }
                value={taskData.description}
                required
                name=""
                id=""
                cols="20"
                rows="6"
                placeholder="Add Description"
              ></textarea>
              <input
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) =>
                  setTaskData({ ...taskData, time: e.target.value })
                }
                value={taskData.time}
                required
                type="number"
                name=""
                id=""
                placeholder="Add Time in Minutes"
                min={0}
              />
              <div className="form-buttons-container flex items-center justify-around">
                <button
                  onClick={() => {
                    setShowAddTaskModal(false);
                    setTaskData({
                      title: "",
                      description: "",
                      time: "",
                      isDone: false,
                    });
                  }}
                  className="text-lg text-white  from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  border border-cyan-600  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="text-lg text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3"
                >
                  {isEditingTask.editing ? `Save` : `Add`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div
        className={`task-container rounded-lg bg-cyan-600 my-4 mx-12 p-12 ${
          showAddTaskModal ? "blur-sm" : null
        }`}
      >
        <h1 className="text-2xl font-semibold text-left ml-12 text-slate-800">
          We have only {tasks.length} for you to get done! Yay!
        </h1>

        <div className="task-list-container py-6 bg-slate-800 rounded-lg my-8   ">
          <div className="flex justify-center md:flex-row flex-col mb-4 items-center">
            <p className="text-2xl md:mx-8 text-teal-100 font-bold">My Tasks</p>
            <button
              onClick={() => {
                setShowAddTaskModal(true);
                setTaskData({
                  title: "",
                  description: "",
                  time: "",
                  isDone: false,
                });
                setIsEditingTask({
                  editing: false,
                  editingTaskId: "",
                });
              }}
              className="text-2xl md:mx-8 rounded-lg px-4 py-1 my-4 bg-cyan-600 text-slate-800"
            >
              +
            </button>
          </div>
          <div className="task-list flex flex-col gap-6 items-center">
            {tasks.map((task) => {
              return (
                <div
                  key={task._id}
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="single-task-container flex items-center border-r-4 border-b-4 border-cyan-600 py-4 px-8 cursor-pointer w-4/5"
                >
                  <div className="task-title-container flex items-center">
                    <input
                      onClick={(e) => {
                        e.stopPropagation();
                        task.isDone = !task.isDone;
                        editTask(task._id, task);
                      }}
                      type="checkbox"
                      name=""
                      id=""
                      className="w-5 h-5"
                    />
                    <p
                      className={`font-bold text-teal-100 ml-2 ${
                        task.isDone ? "line-through" : "no-underline"
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                  <div className="task-action-buttons flex gap-8 ml-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAddTaskModal(true);
                        setTaskData({
                          title: task.title,
                          description: task.description,
                          time: task.time,
                        });
                        setIsEditingTask({
                          editing: true,
                          editingTaskId: task._id,
                        });
                      }}
                      className="text-2xl text-cyan-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task._id);
                      }}
                      className="text-2xl text-cyan-600"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;

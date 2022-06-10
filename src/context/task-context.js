import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import axios from "axios";

const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth.isLoggedIn) {
      (async () => {
        const taskResponse = await axios.get("/api/habits", {
          headers: {
            authorization: auth.token,
          },
        });

        setTasks(taskResponse.data.habits);
      })();
    } else {
      setTasks([]);
    }
  }, [auth]);

  const getSingleTask = async (taskId) => {
    try {
      const response = await axios.get(`/api/habits/${taskId}`, {
        headers: {
          authorization: auth.token,
        },
      });
      return response.data.habit;
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async (taskObj) => {
    try {
      const response = await axios.post(
        "/api/habits",
        { habit: taskObj },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      setTasks(response.data.habits);
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = async (taskId, taskObj) => {
    try {
      const response = await axios.post(
        `/api/habits/${taskId}`,
        { habit: taskObj },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      setTasks(response.data.habits);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`/api/habits/${taskId}`, {
        headers: {
          authorization: auth.token,
        },
      });

      setTasks(response.data.habits);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        getSingleTask,
        createTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => useContext(TaskContext);

export { TaskContextProvider, useTask };

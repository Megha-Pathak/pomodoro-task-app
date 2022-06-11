import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [showLoginError, setShowLoginError] = useState({
    showError: false,
    message: "",
  });

  const { setAuth } = useAuth();

  const loginExistingUser = async () => {
    try {
      const response = await axios.post("/api/auth/login", loginData);

      localStorage.setItem("USER_TOKEN", response.data.encodedToken);
      localStorage.setItem(
        "USER_DATA",
        JSON.stringify({
          firstName: response.data.foundUser.firstName,
          lastName: response.data.foundUser.lastName,
          email: response.data.foundUser.email,
        })
      );

      setAuth({
        isLoggedIn: true,
        token: response.data.encodedToken,
        user: {
          firstName: response.data.foundUser.firstName,
          lastName: response.data.foundUser.lastName,
          email: response.data.foundUser.email,
        },
      });

      navigate("/tasks");
    } catch (err) {
      console.log(err);

      setShowLoginError({
        showError: true,
        message: "Email or Password is wrong!",
      });
    }
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    setLoginData({
      email: "",
      password: "",
    });
    loginExistingUser();
  };

  const guestLoginHandler = (e) => {
    setLoginData({
      email: "johndoe@gmail.com",
      password: "johndoe12345",
    });

    loginExistingUser();
  };

  return (
    <>
      <main className="flex justify-center mt-16">
        <div className="signup-container w-1/2">
          <form
            onSubmit={loginSubmitHandler}
            className="border-2 border-cyan-400 rounded-2xl flex flex-col gap-4 p-6"
          >
            <h1 className="font-bold text-xl text-cyan-400">Login</h1>

            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="signup-email"
            >
              Email
            </label>

            <input
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe@gmail.com"
              type="email"
              name=""
              value={loginData.email}
              id="signup-email"
            />

            <div className="password-container relative flex flex-col gap-4">
              <label
                className="text-left font-bold text-xs text-slate-200"
                htmlFor="signup-password"
              >
                Password
              </label>
              <input
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="·········"
                type={showPassword ? "text" : "password"}
                name=""
                value={loginData.password}
                id="signup-password"
              />
              <span className="eye-icon absolute bottom-3 right-4 cursor-pointer text-gray-200">
                {showPassword ? (
                  <span onClick={() => setShowPassword(!showPassword)}>
                    <FaEye />
                  </span>
                ) : (
                  <span onClick={() => setShowPassword(!showPassword)}>
                    <FaEyeSlash />
                  </span>
                )}
              </span>
            </div>

            {showLoginError.showError ? (
              <div className="signup-error-container text-xs font-bold text-red-500 border-2 border-red-500 py-1 px-2">
                <p> {showLoginError.message} </p>
              </div>
            ) : null}

            <button
              type="submit"
              className="text-lg text-white  from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  border border-cyan-600  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3"
            >
              Login
            </button>
            <button
              onClick={guestLoginHandler}
              className="text-lg text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3"
            >
              Login as Guest
            </button>

            <button className="text-sm font-semibold text-teal-100 hover:text-cyan-400 underline underline-offset-4 flex items-center justify-center">
              <Link to="/signup">Create New Account</Link>
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    passwordAgain: false,
  });

  const [showSignupError, setShowSignupError] = useState({
    showError: false,
    message: "",
  });

  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const signupSubmitHandler = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.passwordAgain) {
      setShowSignupError({
        showError: true,
        message: "Given passwords does not match!",
      });
    } else {
      setShowSignupError({
        showError: false,
        message: "",
      });
      setSignupData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordAgain: "",
      });

      const createNewUser = async () => {
        try {
          const response = await axios.post("/api/auth/signup", {
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            email: signupData.email,
            password: signupData.password,
          });

          localStorage.setItem("USER_TOKEN", response.data.encodedToken);

          localStorage.setItem(
            "USER_DATA",
            JSON.stringify({
              firstName: response.data.createdUser.firstName,
              lastName: response.data.createdUser.lastName,
              email: response.data.createdUser.email,
            })
          );

          setAuth({
            isLoggedIn: true,
            token: response.data.encodedToken,
            user: {
              firstName: response.data.createdUser.firstName,
              lastName: response.data.createdUser.lastName,
              email: response.data.createdUser.email,
            },
          });

          navigate("/tasks");
        } catch (err) {
          console.log(err);
          setShowSignupError({
            showError: true,
            message: "Account already exists, please Login!",
          });
        }
      };
      createNewUser();
    }
  };

  return (
    <>
      <main className="flex justify-center">
        <div className="signup-container w-1/2">
          <form
            onSubmit={signupSubmitHandler}
            className="border-2 border-cyan-400 rounded-2xl flex flex-col gap-3 p-8"
          >
            <h1 className="font-bold text-xl text-cyan-400">Signup</h1>
            <label
              className="text-left font-bold text-xs text-slate-200"
              htmlFor="signup-first-name"
            >
              First Name
            </label>
            <input
              onChange={(e) =>
                setSignupData({ ...signupData, firstName: e.target.value })
              }
              value={signupData.firstName}
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              type="text"
              name=""
              id="signup-first-name"
              required
            />
            <label
              className="text-left font-bold text-xs text-slate-200"
              htmlFor="signup-last-name"
            >
              Last Name
            </label>
            <input
              onChange={(e) =>
                setSignupData({ ...signupData, lastName: e.target.value })
              }
              value={signupData.lastName}
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              type="text"
              name=""
              id="signup-last-name"
              required
            />
            <label
              className="text-left font-bold text-xs text-slate-200"
              htmlFor="signup-email"
            >
              Email
            </label>
            <input
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              value={signupData.email}
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" johndoe@gmail.com"
              type="email"
              name=""
              id="signup-email"
              required
            />

            <div className="create-password-container relative flex flex-col gap-4">
              <label
                className="text-left font-bold text-xs text-slate-200"
                htmlFor="signup-password"
              >
                Password
              </label>
              <input
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                value={signupData.password}
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="·········"
                type={showPasswords.password ? "text" : "password"}
                name=""
                id="signup-password"
                minLength={6}
                required
              />
              <span className="eye-icon absolute bottom-3 right-4 cursor-pointer text-lg">
                {showPasswords.password ? (
                  <span
                    className="text-gray-200"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        password: !showPasswords.password,
                      })
                    }
                  >
                    {" "}
                    <FaEye />
                  </span>
                ) : (
                  <span
                    className="text-gray-200"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        password: !showPasswords.password,
                      })
                    }
                  >
                    <FaEyeSlash />
                  </span>
                )}
              </span>
            </div>

            <div className="create-password-again-container relative flex flex-col gap-4">
              <label
                className="text-left font-bold text-xs text-slate-200"
                htmlFor="signup-password-again"
              >
                Password Again
              </label>
              <input
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    passwordAgain: e.target.value,
                  })
                }
                value={signupData.passwordAgain}
                className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="·········"
                type={showPasswords.passwordAgain ? "text" : "password"}
                name=""
                id="signup-password-again"
                minLength={6}
                required
              />
              <span className="eye-icon absolute bottom-3 right-4 cursor-pointer text-lg">
                {showPasswords.passwordAgain ? (
                  <span
                    className="text-gray-200"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        passwordAgain: !showPasswords.passwordAgain,
                      })
                    }
                  >
                    <FaEye />
                  </span>
                ) : (
                  <span
                    className="text-gray-200"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        passwordAgain: !showPasswords.passwordAgain,
                      })
                    }
                  >
                    <FaEyeSlash />
                  </span>
                )}
              </span>
            </div>
            {showSignupError.showError ? (
              <div className="signup-error-container text-xs font-bold text-orange-500 border-2 border-orange-500 py-1 rounded-xl">
                <p> {showSignupError.message} </p>
              </div>
            ) : null}

            <button
              type="submit"
              className="text-lg text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3"
            >
              Signup
            </button>
            <button className="text-sm font-semibold text-teal-100 hover:text-cyan-400 underline underline-offset-4 flex items-center justify-center">
              <Link to="/login">Already have an account</Link>
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;

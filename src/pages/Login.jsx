import React from "react";
import Navbar from "../components/Navbar";
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

  const { auth, setAuth } = useAuth();

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
    <div className="Login">
      <Navbar />
      <main className="flex justify-center mt-16">
        <div className="signup-container w-1/2">
          <form
            onSubmit={loginSubmitHandler}
            className="border-2 border-cyan-400 rounded-2xl flex flex-col gap-4 p-6"
          >
            <h1 className="font-bold text-xl text-cyan-400">Login</h1>

            <label
              className="text-left font-bold text-xs text-slate-200"
              htmlFor="signup-email"
            >
              Email
            </label>
            <input
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="py-2 px-4 rounded-2xl text-sm font-semibold placeholder:text-gray-500 placeholder:text-sm placeholder:font-normal border-2  border-cyan-400"
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
                className="py-2 px-4 w-full rounded-2xl text-sm font-semibold placeholder:text-gray-500 placeholder:text-xl placeholder:font-normal border-2  border-cyan-400"
                placeholder="·········"
                type={showPassword ? "text" : "password"}
                name=""
                value={loginData.password}
                id="signup-password"
              />
              <span className="eye-icon absolute bottom-3 right-4 cursor-pointer">
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
              <div className="signup-error-container text-xs font-bold text-orange-500 border-2 border-orange-500 py-1 rounded-xl">
                <p> {showLoginError.message} </p>
              </div>
            ) : null}

            <button
              type="submit"
              className=" text-cyan-400 border-2 border-cyan-400 font-bold py-1 px-4 rounded-2xl rounded-bl-none"
            >
              Login
            </button>
            <button
              onClick={guestLoginHandler}
              className=" bg-cyan-400 text-slate-800 font-bold py-2 px-4 rounded-2xl rounded-tr-none"
            >
              Login as Guest
            </button>

            <button className="text-sm font-semibold text-teal-100 hover:text-cyan-400 underline underline-offset-4 flex items-center justify-center">
              <Link to="/signup">Create New Account</Link>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;

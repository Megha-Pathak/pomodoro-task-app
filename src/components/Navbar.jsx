import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Navbar = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("USER_DATA");

    setAuth({
      isLoggedIn: localStorage.getItem("USER_TOKEN") ? true : false,
      token: localStorage.getItem("USER_TOKEN"),
      user: JSON.parse(localStorage.getItem("USER_DATA")),
    });

    navigate("/login");
  };

  return (
    <nav className="Navbar border-0 border-teal-400 flex flex-row justify-between p-2">
      <div className="left-navbar flex flex-row items-center ml-12">
        <div className="brand-logo"></div>
        <Link to="/">
          <div className="brand-name text-teal-100 font-bold text-3xl">
            Potato Clock
          </div>
        </Link>
      </div>
      <div className="right-navbar flex flex-row items-center justify-between mr-12">
        <button
          onClick={() => {
            auth.isLoggedIn ? navigate("/tasks") : navigate("/login");
          }}
          className="font-bold text-lg ml-8 text-teal-100"
        >
          tasks
        </button>

        {auth.isLoggedIn ? (
          <div className="ml-8 mr-8 flex flex-col items-start text-teal-100 relative">
            <button
              onClick={logoutHandler}
              className="bg-cyan-400 text-white font-medium px-6 py-2 rounded-2xl rounded-bl-none ml-8 mr-8"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-cyan-400 text-white font-medium px-6 py-2 rounded-2xl rounded-bl-none ml-8 mr-8">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

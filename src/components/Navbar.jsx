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
          My Tasks
        </button>

        {auth.isLoggedIn ? (
          <div className="ml-8 mr-8 flex flex-col items-start text-teal-100 relative">
            <button
              onClick={logoutHandler}
              className="text-lg text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="text-lg text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50  rounded-lg px-6 py-2 text-center mr-2 mb-2 mt-3 ml-4">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

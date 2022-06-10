import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";

const Navbar = () => {
  const { auth, setAuth } = useAuthContext();

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
    <nav class="bg-white border-gray-200 px-2 py-2">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="flex">
          <Link to="/">
            <span class="self-center text-lg font-semibold whitespace-nowrap">
              Potato Clock
            </span>
          </Link>
        </div>

        <div class=" md:block w-full md:w-auto" id="mobile-menu">
          <ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <div
                class="bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded"
                aria-current="page"
              >
                <Link to="/">Home</Link>
              </div>
            </li>
            <li>
              <div class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                <button
                  onClick={() => {
                    auth.isLoggedIn ? navigate("/tasks") : navigate("/login");
                  }}
                >
                  Tasks
                </button>
              </div>
            </li>

            {auth.isLoggedIn ? (
              <li>
                <div class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              </li>
            ) : (
              <li>
                <div class="text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                  <Link to="/login">Login</Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import logo from "../../assets/icons/tasks.png";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
const Navbar = () => {
  const { logOut, user, loading } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    // Add or remove the 'dark' class to <html> tag
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]); // Re-run this effect whenever isDarkMode changes

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const links = (
    <>
      <li>
        <a>Item 1</a>
      </li>

      <li>
        <a>Item 3</a>
      </li>
    </>
  );
  if (loading) {
    return <span className="loading loading-ring loading-md"></span>;
  }
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <Link to="/" className="flex items-center">
            <img className="w-10" src={logo} alt="Logo" />
            <p className="font-bold text-3xl tracking-widest font bg-gradient-to-r from-black to-purple-700 bg-clip-text text-transparent">
              OptiTask
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div>
          <button onClick={toggleTheme} className="p-2 rounded-full text-2xl">
            {isDarkMode ? (
              <FaSun className="text-yellow-500" /> // Sun icon for light mode
            ) : (
              <FaMoon /> // Moon icon for dark mode
            )}
          </button>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="bg-red-500 px-3 py-1 rounded mt-5 hover:bg-red-700"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/register"
              className="bg-blue-500 px-3 py-1 rounded mt-5 hover:bg-blue-700"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

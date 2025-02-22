import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import logo from "../../assets/icons/tasks.png";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
const Navbar = () => {
  const { logOut, user, loading } = useAuth();
  
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
  };
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/about">About Us</Link>
      </li>
     
    </>
  );
  if (loading) {
    return <span className="loading loading-ring loading-md"></span>;
  }
  return (
    <div>
      <div className="navbar font2 bg-base-100 shadow-sm px-10">
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
        {/* <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div> */}
       
        <div className="navbar-end">
        <div>
          <button onClick={toggleTheme} className="p-2 rounded-full text-2xl">
            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}
          </button>
        </div>
        <div className="navbar-center text-xl font-semibold hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className=" ">
              {user ? (
                <>
                  <img
                    src={user?.photoURL}
                    className="w-10 rounded-full h-10"
                    alt=""
                  />
                </>
              ) : (
                <>
                  <IoMdPerson className="w-10 rounded-full h-10"></IoMdPerson>
                </>
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li className="text-xl font-bold">
                <p>{user?.displayName}</p>
              </li>

              <li>
                <Link to="/profile" className="flex items-center gap-1"><IoMdPerson></IoMdPerson>My Profile</Link>
              </li>
              <li>
                {user ? (
                  <button
                    onClick={handleLogOut}
                    className="bg-purple-900 flex items-center gap-1 text-white px-3 mt-1 py-1 rounded  hover:bg-purple-700"
                  >
                   <CiLogout></CiLogout> Log Out
                  </button>
                ) : (
                  <Link
                    to="/register"
                    className="bg-blue-500 px-3 py-1 rounded  hover:bg-blue-700"
                  >
                    Register
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

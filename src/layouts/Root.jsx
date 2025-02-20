import { Outlet } from "react-router";
import Navbar from "../Componenets/Shared/Navbar";


const Root = () => {
  return (
    <div>
      <div className="">
        <Navbar></Navbar>
        <div className="min-h-screen dark:bg-black dark:text-white">
          {" "}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Root;

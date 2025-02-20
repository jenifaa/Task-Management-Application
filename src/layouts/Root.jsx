import { Outlet } from "react-router";
import Navbar from "../Componenets/Shared/Navbar";
import Sidebar from "../Componenets/Shared/Sidebar";

const Root = () => {
  return (
    <div>
      <div className="flex items-start justify-start">
        <div className="">
          <Sidebar></Sidebar>
        </div>
        <div className="w-screen">
          <Navbar></Navbar>
        </div>
      </div>
      <div className="ml-60">
        {" "}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;

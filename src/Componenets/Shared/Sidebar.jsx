import { Link } from "react-router";
import logo from "../../assets/icons/tasks.png";
const Sidebar = () => {
  return (
    <div className="fixed">
      <div className="w-56 bg-black text-center p-6 text-white min-h-screen">
        <Link to="/" className="flex items-center mb-10">
          {" "}
          <img className="w-10" src={logo} alt="" />
          <p className="font-bold font text-3xl tracking-widest bg-gradient-to-r from-white to-purple-700 bg-clip-text text-transparent">
            OptiTask
          </p>
        </Link>
        <div>
          <ul className="flex flex-col gap-5">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <Link to="/register">Register</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

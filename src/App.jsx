import Root from "./layouts/Root";
import Home from "./Componenets/Home/Home";
import Register from "./Componenets/Authentication/Register";
import { Route, Routes } from "react-router";
import Login from "./Componenets/Authentication/Login";

import AboutUs from "./Componenets/Pages/AboutUs";
import PrivateRoutes from "./layouts/PrivateRoutes";
import MyProfile from "./Componenets/Pages/MyProfile";
import ManageTask from "./Componenets/Home/ManageTask";

function App() {
  return (
    <Routes>
      {" "}
      <Route path="/" element={<PrivateRoutes><Root /></PrivateRoutes>}>
        <Route index element={<Home />} />
        <Route path="/about" element={<AboutUs></AboutUs>} />
        <Route path="/profile" element={<MyProfile></MyProfile>} />
        <Route path="/manage" element={<ManageTask></ManageTask>} />
        
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login></Login>} />
    </Routes>
  );
}

export default App;

import Root from "./layouts/Root";
import Home from "./Componenets/Home/Home";
import Register from "./Componenets/Authentication/Register";
import { Route, Routes } from "react-router";
import Login from "./Componenets/Authentication/Login";
import PrivateRoutes from "./layouts/PrivateRoutes";

function App() {
  return (
    <Routes>
      
        {" "}
        <Route path="/" element={<Root />}>
          <Route index element={<PrivateRoutes><Home /></PrivateRoutes>} />
        </Route>
     
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login></Login>} />
    </Routes>
  );
}

export default App;

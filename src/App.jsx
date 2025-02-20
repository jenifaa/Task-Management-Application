
import Root from "./layouts/Root";
import Home from "./Componenets/Home/Home";
import Register from "./Componenets/Authentication/Register";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

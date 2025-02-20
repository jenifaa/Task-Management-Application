import { Route, Routes } from "react-router";

import Root from "./layouts/Root";
import Home from "./Componenets/Home/Home";
import Register from "./Componenets/Authentication/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root></Root>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

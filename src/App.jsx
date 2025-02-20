import { Route, Routes } from "react-router";

import Root from "./layouts/Root";
import Home from "./Componenets/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root></Root>}>
          <Route index element={<Home></Home>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

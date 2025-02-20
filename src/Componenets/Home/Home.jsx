import Add from "./Add";
import AllTask from "./AllTask";

const Home = () => {
  return (
    <div>
      <h2>Home page</h2>
      <div className="flex justify-between pr-10">
        <AllTask></AllTask>
        <Add></Add>
      </div>
    </div>
  );
};

export default Home;

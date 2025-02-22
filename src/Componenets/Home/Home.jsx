import Add from "./Add";
import AllTask from "./AllTask";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
     
      <div className="md:flex justify-between mb-16">
       {/* <div className=""> */}
        <Banner></Banner>
        {/* </div> */}
       {/* <div className=""> */}
         <Add></Add>
         {/* </div> */}
      </div>

      
      <AllTask></AllTask>
    </div>
  );
};

export default Home;

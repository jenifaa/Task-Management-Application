import { useNavigate } from "react-router";
import useAxiosSecure from "./axiosSecure";
import useAuth from "./useAuth";
import google from '../../assets/icons/google (1).png'


const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = () => {
    signInWithGoogle().then((result) => {
    
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        type: "user", 
       
      };

      axiosSecure
        .post("/users", userInfo)
        .then((res) => {
          if (res.data.insertedId || res.data.message === "User exists") {
            navigate("/"); 
          }
        })
     
    });
  };
  return (
    <div className="flex justify-center items-center mt-2">
      <div className=" py-2 rounded-full border-2 border-gray-300 w-[80%] lg:w-[60%]">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 px-4"
        >
          <img className="w-8" src={google} alt="" />
          SignIn/SignUp
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;

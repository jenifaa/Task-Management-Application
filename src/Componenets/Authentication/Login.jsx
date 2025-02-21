import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import GoogleLogin from "../Hooks/GoogleLogin";
import bg from "../../assets/images/bg.jpg";
import bgLogo from "../../assets/icons/tasks.png";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then((result) => {
      const user = result.user;

      navigate("/", { replace: true });
    });
  };

  return (
    <div
      className="min-h-screen "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="">
        <div className="mx-auto  lg:w-1/2 max-w-md font-semibold  absolute bg-purple-100 min-h-screen  ">
          <div className="pb-20 flex items-center pt-5 px-4">
            <img src={bgLogo} className="w-16" alt="" />
            <p className="font-bold text-3xl tracking-widest font bg-gradient-to-r from-black to-purple-700 bg-clip-text text-transparent">
              OptiTask
            </p>
          </div>
          <div className="px-16">
            <div className="mb-10 text-center">
              <h2 className=" text-5xl  font font-bold text-purple-900 mb-2">
                Welcome
              </h2>
              <p className="text-sm font">
                Login to your Account to continue...
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <h2 className="">Email*</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="text-black border-b-2 border-purple-900 rounded-md py-2 px-3 w-full mt-2 mb-5"
                  required
                />
              </div>
              <div className="form-control">
                <h2>Password*</h2>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="text-black border-b-2 border-purple-900 rounded-md py-2 px-3 w-full mt-2"
                  required
                />
              </div>

              <p className=" text-purple-900 mb-2 mt-1">
                <small>
                  New Here? Create an Account -
                  <Link className="font-bold" to="/register">
                    SingUp
                  </Link>
                </small>
              </p>
              <div className="">
                <input
                  className="w-full py-2 my-3  border-b-2 border-purple-900 rounded-lg text-purple-900  font-bold "
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div className="text-center text-purple-700 ">
              <p>Or </p>
              <GoogleLogin></GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

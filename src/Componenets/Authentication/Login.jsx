import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import GoogleLogin from "../Hooks/GoogleLogin";

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
    <div>
      <div className=" min-h-screen">
        <div className=" gap-16 py-8 lg:flex items-center">
          <div className="mx-auto px-5 lg:w-1/2 max-w-sm font-semibold">
            <div className="mb-10 text-center text-green-700">
              <h2 className=" text-5xl  font font-bold mb-2">Welcome</h2>
              <p className="text-sm">Login to your Account to continue...</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <h2>Email*</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="text-black border-2 rounded-md py-2 px-3 w-full mt-2 mb-5"
                  required
                />
              </div>
              <div className="form-control">
                <h2>Password*</h2>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="text-black border-2 rounded-md py-2 px-3 w-full mt-2"
                  required
                />
              </div>

              <p className=" text-green-700 mb-2">
                <small>
                  New Here? Create an Account -
                  <Link className="font-bold" to="/register">
                    SingUp
                  </Link>
                </small>
              </p>
              <div className="">
                <input
                  className="w-full py-2 my-2 bg-opacity-90 rounded-lg text-white font-bold bg-green-900"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <div className="text-center text-green-700 ">
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

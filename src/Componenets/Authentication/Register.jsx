import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/axiosSecure";
import GoogleLogin from "../Hooks/GoogleLogin";

const Register = () => {
  // const [errors, setErrors] = useState('')
  const navigate = useNavigate();
  const { createNewUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const onSubmit = (data) => {
    createNewUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;

      updateUserProfile(data.name, data.photoURL).then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            navigate("/");
          }
        });
      });
    });
  };
  return (
    <div>
      <div>
        <div className="pt-20 mb-10 ">
          <div className="   flex flex-col-reverse lg:flex-row  items-center lg:w-10/12 mx-auto">
            <div className=" md:w-8/12 w-10/12  lg:w-1/2 mx-auto lg:max-w-xs">
              <h2 className="text-center text-4xl font mb-8 font-bold">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="form-control">
                  <h2 className="">Name*</h2>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="Your Name"
                    className="text-black border-b-2 border-purple-800 rounded-md py-2 px-3 w-full mt-2 mb-5"
                  />
                  {errors.name && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <h2 className="">Email*</h2>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="Your email"
                    className="text-black border-b-2 rounded-md py-2 px-3 w-full mt-2 mb-2"
                  />
                  {errors.name && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>

                <div className="form-control">
                  <h2 className="">PhotoUrl*</h2>
                  <input
                    type="url"
                    {...register("photoURL", { required: true })}
                    placeholder="Your PhotoURL"
                    className="text-black border-b-2 rounded-md py-2 px-3 w-full mt-2 mb-5"
                  />
                  {errors.photoURL && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>

                <div className="form-control">
                  <h2 className="">Password*</h2>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                    })}
                    name="password"
                    placeholder="password"
                    className="text-black border-b-2 rounded-md py-2 px-3 w-full mt-2 mb-5"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be at least 6 character
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be lower than 20 character
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must be one uppercase,one lowercase, one digit,
                      one special character
                    </p>
                  )}
                </div>
                <div className="">
                  <input
                    className="w-full py-2 my-2 bg-opacity-90 rounded-lg border font-bold "
                    type="submit"
                    value="Sign Up"
                  />
                </div>

                <p className="text-center ">
                  <small>
                    New Here? Create an Account -
                    <Link className="font-bold" to="/login">
                      SingIn
                    </Link>
                  </small>
                </p>
              </form>
              <div className="text-center text-green-700 ">
              <p>Or </p>
              <GoogleLogin></GoogleLogin>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

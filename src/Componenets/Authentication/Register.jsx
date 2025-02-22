import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/axiosSecure";
import GoogleLogin from "../Hooks/GoogleLogin";
import bgImg from "../../assets/images/bg.jpg";
import bgLogo from "../../assets/icons/tasks.png";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
const Register = () => {
  // const [errors, setErrors] = useState('')
  const navigate = useNavigate();
  const { createNewUser, updateUserProfile } = useAuth();
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
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
          userId: loggedUser.uid,
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
    <div
      className="min-h-screen "
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <div className=" ">
          <div className="  max-w-md lg:w-1/2 bg-purple-100 min-h-screen ">
            <div className="pb-20 flex items-center pt-5 px-4">
              <img src={bgLogo} className="w-16" alt="" />
              <p className="font-bold text-3xl tracking-widest font bg-gradient-to-r from-black to-purple-700 bg-clip-text text-transparent">
                OptiTask
              </p>
            </div>
            <div className="  px-14 ">
              <h2 className="text-center text-5xl font mb-8 text-purple-900 font-bold">
                Sign Up
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="">
                {step === 1 && (
                  <>
                    <div className="form-control">
                      <h2 className="">Name*</h2>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        name="name"
                        placeholder="Your Name"
                        className="text-black border-b-2  rounded-md py-2 px-3 w-full mt-2 mb-5"
                      />
                      {errors.name && (
                        <span className="text-red-600">
                          This field is required
                        </span>
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
                        <span className="text-red-600">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end mb-5 mt-3">
                      <button
                        type="button"
                        className=" text-sm font-bold text-purple-900 flex items-center gap-3"
                        onClick={handleNext}
                      >
                        Continue <FaArrowRightLong className="text-sm" />
                      </button>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="form-control">
                      <h2 className="">PhotoUrl*</h2>
                      <input
                        type="url"
                        {...register("photoURL", { required: true })}
                        placeholder="Your PhotoURL"
                        className="text-black border-b-2 rounded-md py-2 px-3 w-full mt-2 mb-5"
                      />
                      {errors.photoURL && (
                        <span className="text-red-600">
                          This field is required
                        </span>
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
                          Password must be one uppercase,one lowercase, one
                          digit, one special character
                        </p>
                      )}
                    </div>
                    <div className="">
                      <div className="flex items-center ">
                        <button
                          type="button"
                          className=" text-sm font-bold text-purple-900 flex items-center gap-2"
                          onClick={handleBack}
                        >
                          <FaArrowLeft className="text-sm " /> Back
                        </button>
                      </div>
                      <input
                        className="w-full py-2 my-2 border-b-2 bg-purple-900 rounded-lg text-white font-bold "
                        type="submit"
                        value="Sign Up"
                      />
                    </div>
                  </>
                )}

                <p className="text-center text-purple-900">
                  <small>
                    Already have an account? -
                    <Link className="font-bold" to="/login">
                      SingIn
                    </Link>
                  </small>
                </p>
              </form>
              <div className="text-center text-purple-900 ">
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

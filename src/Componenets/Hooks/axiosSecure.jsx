import axios from "axios";


  const axiosSecure = axios.create({
    baseURL: "https://task-management-server-nine-theta.vercel.app",
  });

  const useAxiosSecure = () => {
    return axiosSecure;
  };


export default useAxiosSecure;

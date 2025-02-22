import { useQuery } from "@tanstack/react-query";
import axios from 'axios'; // Ensure axios is imported
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/axiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/taskAdded?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  // Check if tasks is an array
  const completedTasks = Array.isArray(tasks) ? tasks.filter(task => task.category === "Done").length : 0;
  const inProgressTasks = Array.isArray(tasks) ? tasks.filter(task => task.category === "In Progress").length : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-5xl text-center font-bold my-5">My Profile</h2>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <div className="flex items-center space-x-6">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-600"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{user?.displayName}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <hr className="my-6 border-t-2 border-gray-200" />

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Personal Information
            </h3>
         
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-lg text-gray-700">Full Name:</p>
              <p className="text-lg text-black">{user?.displayName}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg text-gray-700">Email:</p>
              <p className="text-lg text-black">{user?.email}</p>
            </div>
          </div>
        </div>

        <hr className="my-6 border-t-2 border-gray-200" />

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Recent Activity
            </h3>
          
          </div>

          <div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-4">
              <div className="flex justify-between">
                <p className="text-lg text-gray-700">Completed Tasks:</p>
                <p className="text-lg text-black font-semibold">{completedTasks}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg text-gray-700">In Progress:</p>
                <p className="text-lg text-black font-semibold">{inProgressTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

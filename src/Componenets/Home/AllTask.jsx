import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import useAuth from "../Hooks/useAuth";


const socket = io("http://localhost:5000");

const AllTask = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/task?email=${user.email}`).then((res) => setTasks(res.data));

      socket.on("taskAdded", (newTask) => {
        if (newTask.email === user?.email) setTasks((prev) => [...prev, newTask]);
      });

    //   socket.on("taskUpdated", (updatedTask) => {
    //     if (updatedTask.email === user?.email) {
    //       setTasks((prev) =>
    //         prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    //       );
    //     }
    //   });

    //   socket.on("taskDeleted", (taskId) => {
    //     setTasks((prev) => prev.filter((task) => task._id !== taskId));
    //   });

      return () => {
        socket.off("taskAdded");
        // socket.off("taskUpdated");
        // socket.off("taskDeleted");
      };
    }
  }, [user?.email]);

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5000/task/${id}`);
//   };

//   const handleComplete = (id) => {
//     axios.put(`http://localhost:5000/task/${id}`, { status: "Completed" });
//   };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.category === filter);

  return (
    <div className="max-w-4xl mx-auto my-5">
      <h2 className="text-2xl font-bold mb-4">📌 Your Tasks</h2>

      <div className="flex gap-3 mb-4">
        {["All", "In Progress", "Done"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              filter === category ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className={`mt-2 text-sm ${task.category === "Completed" ? "text-green-600" : "text-red-600"}`}>
                {task.category}
              </p>

              <div className="mt-3 flex gap-2">
                {task.category !== "Completed" && (
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded"
                    // onClick={() => handleComplete(task._id)}
                  >
                    ✅ Complete
                  </button>
                )}
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                //   onClick={() => handleDelete(task._id)}
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default AllTask;

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const socket = io("http://localhost:5000");

const AllTask = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/task?email=${user.email}`)
        .then((res) => setTasks(res.data));

      socket.on("taskAdded", (newTask) => {
        if (newTask.email === user?.email)
          setTasks((prev) => [...prev, newTask]);
      });

      socket.on("taskUpdated", (updatedTask) => {
        if (updatedTask.email === user?.email) {
          setTasks((prev) =>
            prev.map((task) =>
              task._id === updatedTask._id ? updatedTask : task
            )
          );
        }
      });

      socket.on("taskDeleted", (taskId) => {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      });

      return () => {
        socket.off("taskAdded");
        socket.off("taskUpdated");
        socket.off("taskDeleted");
      };
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/task/${id}`);
  };
  const handleUpdateCategory = (id, newCategory) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, category: newCategory } : task
      )
    );
  
    axios.put(`http://localhost:5000/task/${id}`, { category: newCategory });
  };

  // const handleComplete = (id) => {
  //   axios.put(`http://localhost:5000/task/${id}`, { category: "Done" });
  // };

  const categories = ["To-Do", "In Progress", "Done"];

  return (
    <div className="max-w-6xl mx-auto my-5">
      <h2 className="text-2xl font-bold mb-4 text-center">📌 Your Tasks</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3 text-center">
              {category}
            </h3>
            <div className="space-y-4">
              {tasks.filter((task) => task.category === category).length > 0 ? (
                tasks
                  .filter((task) => task.category === category)
                  .map((task) => (
                    <div
                      key={task._id}
                      className="p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-500"
                    >
                      <h3 className="text-xl font-semibold">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                      <p className="mt-2 text-sm text-blue-600">
                        {task.category}
                      </p>

                      {/* <div className="mt-3 flex gap-2">
                      {task.category !== "Done" && (
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded"
                          onClick={() => handleComplete(task._id)}
                        >
                          ✅ Complete
                        </button>
                      )}
                      {task.category !== "Done" && (
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded"
                          onClick={() => handleComplete(task._id)}
                        >
                          ✅ Complete
                        </button>
                      )}
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(task._id)}
                      >
                        ❌ Delete
                      </button>
                    </div> */}
                      <div className="mt-3 flex gap-2">
                        {task.category === "To-Do" && (
                          <button
                            className="px-3 py-1 bg-yellow-500 text-white rounded"
                            onClick={() =>
                              handleUpdateCategory(task._id, "In Progress")
                            }
                          >
                            ⏳ Move to In Progress
                          </button>
                        )}

                        {task.category === "In Progress" && (
                          <button
                            className="px-3 py-1 bg-green-500 text-white rounded"
                            onClick={() =>
                              handleUpdateCategory(task._id, "Done")
                            }
                          >
                            ✅ Mark as Done
                          </button>
                        )}

                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleDelete(task._id)}
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-500">No tasks found</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const socket = io("http://localhost:5000");

const AllTask = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Store selected task for editing
  const [taskTitle, setTaskTitle] = useState(""); // State for editing task title
  const [taskDescription, setTaskDescription] = useState("");
  const handleSaveEdit = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === selectedTask._id
          ? { ...task, title: taskTitle, description: taskDescription }
          : task
      )
    );
    axios.put(`http://localhost:5000/task/${selectedTask._id}`, {
      title: taskTitle,
      description: taskDescription,
    });

    // Close the modal after saving
    document.getElementById("my_modal_1").close();
  };

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

  const categories = ["To-Do", "In Progress", "Done"];
  const openEditModal = (task) => {
    setSelectedTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    document.getElementById("my_modal_1").showModal(); // Open the modal
  };

  return (
    <div className="w-11/12 mx-auto  my-5">
      <h2 className="text-5xl font-bold mb-14 text-center font2">
        📌 Your Tasks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-2xl font-semibold font2 mb-7 text-center">
              {category}
            </h3>
            <div className="space-y-4">
              {tasks.filter((task) => task.category === category).length > 0 ? (
                tasks
                  .filter((task) => task.category === category)
                  .map((task) => {
                    const today = new Date().toISOString().split("T")[0]; 
                    const isOverdue = task.dueDate && task.dueDate < today;
                    return (
                      <div
                        key={task._id}
                        className="p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-500"
                      >
                        <h1 className="text-sm text-gray-700 text-right">
                          {task.timestamp}
                        </h1>
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <p className="text-gray-600">{task.description}</p>
                        <p
                          className={`mt-2 text-sm font-semibold ${
                            isOverdue ? "text-red-600" : "text-blue-600"
                          }`}
                        >
                          Due date: {task.dueDate}
                          {isOverdue && " (Overdue!)"}
                        </p>

                        <div className="mt-3 flex gap-2">
                          <button
                            className={`px-3 py-1 rounded ${
                              task.category === "To-Do"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-300 text-gray-700 cursor-not-allowed"
                            }`}
                            onClick={() =>
                              handleUpdateCategory(task._id, "In Progress")
                            }
                            disabled={task.category !== "To-Do"}
                          >
                            ⏳In Progress
                          </button>

                          <button
                            className={`px-3 py-1 rounded ${
                              task.category === "In Progress"
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-700"
                            }`}
                            onClick={() =>
                              handleUpdateCategory(task._id, "Done")
                            }
                            // disabled={task.category !== "In Progress"}
                          >
                            ✅ Done
                          </button>

                          <button
                            className=""
                            onClick={() => handleDelete(task._id)}
                          >
                            <MdDeleteForever className="text-2xl text-red-600" />
                          </button>
                          <button
                            className=""
                            onClick={() => openEditModal(task)} // Open modal for editing
                          >
                            <FaRegEdit className="text-2xl text-blue-600" />
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-center text-gray-500">No tasks found</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn hidden"
        onClick={() => document.getElementById("my_modal_1").showModal()} // Hidden button to trigger modal
      >
        open modal
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Task</h3>
          <div className="py-4">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Task Title"
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Task Description"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={handleSaveEdit} // Save the updated task
            >
              Save
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllTask;

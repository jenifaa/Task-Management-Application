import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageTask = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // Fetch tasks associated with the logged-in user
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/taskAdded?email=${user?.email}`);
      return res.data;
    },
  });

  // Handle saving task edits
  const handleSaveEdit = async () => {
    try {
      await axiosSecure.put(`/updatedTask/${selectedTask._id}`, {
        title: taskTitle,
        description: taskDescription,
      });

      refetch(); // Refetch tasks after the update

      // Reset form and close modal
      setSelectedTask(null);
      setTaskTitle("");
      setTaskDescription("");
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // Handle deleting a task
  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid task ID");
      return;
    }

    try {
      await axiosSecure.delete(`/deleteTask/${id}`);
      refetch(); // Refetch tasks after deletion
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Open the modal for editing a task
  const openEditModal = (task) => {
    setSelectedTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    document.getElementById("my_modal_1").showModal();
  };

  if (loading) {
    return <span className="loading loading-ring loading-md"></span>;
  }

  return (
    <div className="w-11/12 mx-auto my-5">
      <h2 className="text-5xl font-bold mb-14 text-center font2">📌 Manage Your Tasks</h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <div key={category}>
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-2xl font-semibold mb-7 text-center">{category}</h3>

                {tasks
                  .filter((task) => task.category === category)
                  .map((task) => (
                    <div key={task._id} className="p-4 bg-white mb-5 rounded-lg shadow-md border-l-4 border-blue-500 space-y-4">
                      <h1 className="text-sm text-gray-700 text-right">{task.timestamp}</h1>
                      <h3 className="text-xl font-semibold">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                      <p className={`mt-2 text-sm font-semibold ${task.dueDate && task.dueDate < new Date().toISOString().split("T")[0] ? "text-red-600" : "text-blue-600"}`}>
                        Due date: {task.dueDate}
                        {task.dueDate && task.dueDate < new Date().toISOString().split("T")[0] && " (Overdue!)"}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => handleDelete(task._id)}>
                          <MdDeleteForever className="text-2xl text-red-600" />
                        </button>
                        <button onClick={() => openEditModal(task)}>
                          <FaRegEdit className="text-2xl text-blue-600" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for editing tasks */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Task</h3>
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
          <div className="modal-action">
            <button className="btn" onClick={handleSaveEdit}>
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

export default ManageTask;

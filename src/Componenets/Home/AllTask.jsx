import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllTask = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/taskAdded?email=${user?.email}`);
      return res.data;
    },
  });

  const handleSaveEdit = async () => {
    try {
      // Update the task on the server
      await axiosSecure.put(`/updatedTask/${selectedTask._id}`, {
        title: taskTitle,
        description: taskDescription,
      });

      refetch();

      setSelectedTask(null);
      setTaskTitle("");
      setTaskDescription("");
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid task ID");
      return;
    }

    try {
      await axiosSecure.delete(`/deleteTask/${id}`);

      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Handle drag and drop (category change)
  const handleUpdateCategory = async (id, newCategory) => {
    await axiosSecure.put(`/updatedTask/${id}`, { category: newCategory });
    refetch();
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    document.getElementById("my_modal_1").showModal();
  };

  // Drag and drop handler
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination, source } = result;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const movedTask = tasks.find((task) => task._id === draggableId);
    const newCategory = ["To-Do", "In Progress", "Done"][
      destination.droppableId
    ];

    try {
      await axiosSecure.put(`/updatedTask/${draggableId}`, {
        category: newCategory,
        order: destination.index,
      });
      refetch();
    } catch (error) {
      console.error("Drag and Drop update failed:", error);
    }
  };

  if (loading) {
    return <span className="loading loading-ring loading-md"></span>;
  }

  return (
    <div className="w-11/12 mx-auto my-5">
      <h2 className="text-5xl font-bold mb-14 text-center">📌 Your Tasks</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["To-Do", "In Progress", "Done"].map((category, index) => (
            <Droppable key={category} droppableId={String(index)}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded-lg shadow"
                >
                  <h3 className="text-2xl font-semibold mb-7 text-center">
                    {category}
                  </h3>
                  {tasks.filter((task) => task.category === category).length >
                  0 ? (
                    tasks
                      .filter((task) => task.category === category)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-4 bg-white mb-5 rounded-lg shadow-md border-l-4 border-blue-500 space-y-4"
                            >
                              <h1 className="text-sm text-gray-700 text-right">
                                {task.timestamp}
                              </h1>
                              <h3 className="text-xl font-semibold">
                                {task.title}
                              </h3>
                              <p className="text-gray-600">
                                {task.description}
                              </p>
                              <p
                                className={`mt-2 text-sm font-semibold ${
                                  task.dueDate &&
                                  task.dueDate <
                                    new Date().toISOString().split("T")[0]
                                    ? "text-red-600"
                                    : "text-blue-600"
                                }`}
                              >
                                Due date: {task.dueDate}
                                {task.dueDate &&
                                  task.dueDate <
                                    new Date().toISOString().split("T")[0] &&
                                  " (Overdue!)"}
                              </p>
                              <div className="mt-3 flex gap-2">
                                <button
                                  className="px-3 py-1 rounded bg-yellow-500 text-white"
                                  onClick={() =>
                                    handleUpdateCategory(
                                      task._id,
                                      "In Progress"
                                    )
                                  }
                                >
                                  ⏳ In Progress
                                </button>
                                <button
                                  className="px-3 py-1 rounded bg-green-500 text-white"
                                  onClick={() =>
                                    handleUpdateCategory(task._id, "Done")
                                  }
                                >
                                  ✅ Done
                                </button>
                                <button onClick={() => handleDelete(task._id)}>
                                  <MdDeleteForever className="text-2xl text-red-600" />
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditModal(task);
                                  }}
                                >
                                  <FaRegEdit className="text-2xl text-blue-600" />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                  ) : (
                    <p className="text-center text-gray-500">No tasks found</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
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

export default AllTask;

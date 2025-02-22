import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

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

 

  // Handle drag and drop (category change)
  const handleUpdateCategory = async (id, newCategory) => {
    await axiosSecure.put(`/updatedTask/${id}`, { category: newCategory });
    refetch();
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
      <div className="flex justify-between font2 items-center ">
        <h2 className="text-5xl font-bold mb-14 ">📌 Your Tasks</h2>
        <Link to="/manage" className="text-5xl font-bold mb-14 ">Manage Task</Link>
      </div>
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
   
    </div>
  );
};

export default AllTask;

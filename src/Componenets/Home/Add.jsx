import { useState } from "react";
import useAxiosSecure from "../Hooks/axiosSecure";
import useAuth from "../Hooks/useAuth";
import { CiCirclePlus } from "react-icons/ci";
const Add = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [dueDate, setDueDate] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || title.length > 50) {
      alert("Title is required and should be no more than 50 characters.");
      return;
    }
    if (description.length > 200) {
      alert("Description should be no more than 200 characters.");
      return;
    }

    const task = {
      title,
      description,
      timestamp: new Date().toISOString(),
      category,
      dueDate,
      email: user?.email,
    };

    try {
      const response = await axiosSecure.post("/task", task);

      if (response.data) {
        console.log("Task added successfully:", response.data);

        setTitle("");
        setDescription("");
        setCategory("To-Do");

        document.getElementById("my_modal_5").close();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="dark:bg-black p-6 rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-5xl font-semibold text-center text-purple-400 dark:text-white font2 pt-10 mb-12">
        Add Task
      </h2>

      <div className="flex justify-center items-center">
        <button
          className=""
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          <CiCirclePlus className="text-8xl text-gray-400"></CiCirclePlus>
        </button>
      </div>

      {/* Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle p-0 bg-transparent"
      >
        <div className="modal-box bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg mx-auto">
          <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Create New Task
          </h3>

          {/* Task Title */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-600 dark:text-gray-300 font-semibold">
                  Task Title
                </legend>
                <input
                  type="text"
                  className="input w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                  required
                />
              </fieldset>
            </div>

            {/* Task Description */}
            <div className="mb-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-600 dark:text-gray-300 font-semibold">
                  Task Description (Optional)
                </legend>
                <textarea
                  className="textarea w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={200}
                ></textarea>
              </fieldset>
            </div>

            {/* <div className="mb-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-gray-600 dark:text-gray-300 font-semibold">
                  Category
                </legend>
                <select
                  className="select w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </fieldset>
            </div> */}

            <div className="mb-6">
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-600 dark:text-gray-300 font-semibold">
                    Category
                  </legend>
                  <input
                    type="text"
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none dark:bg-gray-700 dark:text-white"
                    value="To-Do"
                    readOnly
                  />
                </fieldset>
              </div>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-gray-600 dark:text-gray-300 font-semibold">
                    Due Date
                  </legend>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)} 
                    className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                </fieldset>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="modal-action flex justify-between items-center">
              <button
                className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="submit"
              >
                Add Task
              </button>
              <button
                className="btn bg-red-500 hover:bg-red-600 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                type="button"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Add;

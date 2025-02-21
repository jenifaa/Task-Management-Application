import { useState } from "react";
import useAxiosSecure from "../Hooks/axiosSecure";
import useAuth from "../Hooks/useAuth";
const Add = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
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
    // <div className="dark:bg-black">
    //   <h2>Add Task</h2>
    //   <button
    //     className="btn"
    //     onClick={() => document.getElementById("my_modal_5").showModal()}
    //   >
    //     Add Task
    //   </button>

    //   <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
    //     <div className="modal-box">
    //       <form onSubmit={handleSubmit}>
    //         <div>
    //           <fieldset className="fieldset">
    //             <legend className="fieldset-legend">Task Title</legend>
    //             <input
    //               type="text"
    //               className="input"
    //               placeholder="Enter task title"
    //               value={title}
    //               onChange={(e) => setTitle(e.target.value)}
    //               maxLength={50}
    //               required
    //             />
    //           </fieldset>
    //         </div>

    //         <div>
    //           <fieldset className="fieldset">
    //             <legend className="fieldset-legend">
    //               Task Description (Optional)
    //             </legend>
    //             <textarea
    //               className="textarea h-24"
    //               placeholder="Enter task description"
    //               value={description}
    //               onChange={(e) => setDescription(e.target.value)}
    //               maxLength={200}
    //             ></textarea>
    //           </fieldset>
    //         </div>

    //         <div>
    //           <fieldset className="fieldset">
    //             <legend className="fieldset-legend">Category</legend>
    //             <select
    //               className="select"
    //               value={category}
    //               onChange={(e) => setCategory(e.target.value)}
    //             >
    //               <option value="To-Do">To-Do</option>
    //               <option value="In Progress">In Progress</option>
    //               <option value="Done">Done</option>
    //             </select>
    //           </fieldset>
    //         </div>

    //         <div className="modal-action">
    //           <button className="btn" type="submit">
    //             Add Task
    //           </button>
    //           <button
    //             className="btn"
    //             type="button"
    //             onClick={() => document.getElementById("my_modal_5").close()}
    //           >
    //             Close
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </dialog>
    // </div>
    <div className="dark:bg-black p-6 rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Add Task
      </h2>

      {/* Add Task Button */}
      <button
        className="btn bg-blue-500 hover:bg-blue-600 text-white shadow-md py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Add Task
      </button>

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

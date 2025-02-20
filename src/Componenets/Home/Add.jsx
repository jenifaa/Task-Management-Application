import { useState } from "react";
import useAxiosSecure from "../Hooks/axiosSecure";
const Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
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
    <div>
      <h2>Add Task</h2>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Add Task
      </button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Task Title</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                  required
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Task Description (Optional)
                </legend>
                <textarea
                  className="textarea h-24"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={200}
                ></textarea>
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Category</legend>
                <select
                  className="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </fieldset>
            </div>

            <div className="modal-action">
              <button className="btn" type="submit">
                Add Task
              </button>
              <button
                className="btn"
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

// import { Link } from "react-router";

const Add = () => {
  return (
    <div>
      <h2>Add content</h2>
      {/* <Link to="">Add here</Link> */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Add here
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your name?</legend>
              <input type="text" className="input" placeholder="Type here" />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Your bio</legend>
              <textarea className="textarea h-24" placeholder="Bio"></textarea>
             
            </fieldset>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Add;

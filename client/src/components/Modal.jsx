import React from "react";
import "./Modal.css"

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Your order is successfully</h1>
        </div>
        <div className="body">
          <p>You can track the delivery in the "Order" section</p>
        </div>
        <div className="footer">
          <button>Go to orders</button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
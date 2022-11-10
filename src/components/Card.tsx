import React, { MouseEventHandler, useCallback, useEffect } from "react";
import { deleteEmployee, fetchAllEmployees } from "../store/employee-slice";
import { useAppDispatch } from "../store/hooks";
import editSlice from "../store/edit-slice";

import classes from "./Card.module.css";
import { useHistory } from "react-router-dom";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const Card = (props: any) => {
  const dispatch = useAppDispatch();
  const { id, name, salary, department } = props.employee;
  const history = useHistory();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const editEmployeeHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // Maybe pass in the ID into EmployeeForm?
    dispatch(editSlice.actions.setIdToEdit(id));
    dispatch(editSlice.actions.editState(true));

    history.push("/edit");
  };

  // https://stackoverflow.com/questions/45089866/specifying-onclick-event-type-with-typescript-and-react-konva
  const deleteEmployeeHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(deleteEmployee(id));
  };

  return (
    <React.Fragment>
      <div className={classes["card-container"]}>
        <div className={classes["employee-details"]}>
          <h1 className={classes.name}>{name}</h1>
          <div className={classes.description}>
            <p>{department}</p>
            <p>${salary}</p>
          </div>
        </div>
        <div className={classes["button-group"]}>
          <button onClick={editEmployeeHandler}>Edit</button>
          <button onClick={openModal}>Delete</button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2>Are you sure you want to delete?</h2>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={deleteEmployeeHandler}>Delete</button>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;

import React, { MouseEventHandler, useCallback, useEffect } from "react";
import { deleteEmployee, fetchAllEmployees } from "../store/employee-slice";
import { useAppDispatch } from "../store/hooks";
import editSlice from '../store/edit-slice';

import classes from "./Card.module.css";
import { useHistory } from "react-router-dom";

const Card = (props: any) => {
  const dispatch = useAppDispatch();
  const {id, name, salary, department} = props.employee;
  const history = useHistory();

  const editEmployeeHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // Maybe pass in the ID into EmployeeForm?
    dispatch(editSlice.actions.setIdToEdit(id));
    dispatch(editSlice.actions.editState(true));
    
    history.push('/edit');
  };

  // https://stackoverflow.com/questions/45089866/specifying-onclick-event-type-with-typescript-and-react-konva
  const deleteEmployeeHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(deleteEmployee(id));
  };

  // useEffect(() => {}, [dispatch]);

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
          <button onClick={deleteEmployeeHandler}>Delete</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;

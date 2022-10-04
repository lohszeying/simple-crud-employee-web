import React, { Fragment, MutableRefObject, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { RefactorActionInfo } from "typescript";
import { addEmployee } from "../store/employee-slice";
import { useAppDispatch } from "../store/hooks";
import classes from "./EmployeeForm.module.css";

const EmployeeForm = (props: any) => {
  // const nameInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const salaryInputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const departmentInputRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const  submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    
    const enteredName = nameInputRef.current.value;
    const enteredSalary = Number(salaryInputRef.current.value);
    const enteredDepartment = departmentInputRef.current.value;

    // optional: Could validate here

    // props.onAddQuote({ author: enteredAuthor, text: enteredText });
    
  
    
    dispatch(addEmployee({name: enteredName, salary: enteredSalary, department: enteredDepartment}));

    history.push('/');
  }

  const finishEnteringHandler = () => {
    // setIsEntering(true);
  };

  return (
    <Fragment>
      <form
        className={classes.form}
        onSubmit={submitFormHandler}
      >
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          {/* https://stackoverflow.com/questions/69157200/minlength-doesnt-work-in-typescript-react */}
          <input type="text" id="name" minLength={4} maxLength={30} required={true} ref={nameInputRef} placeholder="John Doe" />
        </div>

        <div className={classes.control}>
          <label htmlFor="salary">Salary</label>
          <input type="number" id="number" min="0" required={true} ref={salaryInputRef} placeholder="2500" />
        </div>

        {/* Department should be dropdown */}
        <div className={classes.control}>
          <label htmlFor="name">Department</label>
          <select id="department" ref={departmentInputRef} required={true} >
            <option value="HR">HR</option>
            <option value="PS">PS</option>
          </select>
        </div>

        <div className={classes.actions}>
          <button onClick={finishEnteringHandler} className="btn">
            Add Employee
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EmployeeForm;

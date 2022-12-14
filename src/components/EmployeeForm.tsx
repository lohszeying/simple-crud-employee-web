import { current } from "@reduxjs/toolkit";
import React, {
  ChangeEventHandler,
  Fragment,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { setConstantValue } from "typescript";
import { Status } from "../model/status";
import { RootState } from "../store";
import editSlice from "../store/edit-slice";
import employeeSlice, {
  addEmployee,
  fetchEmployeeById,
  updateEmployee,
} from "../store/employee-slice";
import { useAppDispatch } from "../store/hooks";
import classes from "./EmployeeForm.module.css";
import { Department } from "../model/department";

import { Button } from "@mui/material";
import { getDepartments } from "../store/department-slice";
import { useCookies } from "react-cookie";

const EmployeeForm = (props: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const editMode = useSelector((state: RootState) => state.edit.edit);
  const getId = useSelector((state: RootState) => state.edit.idToEdit);
  const getStatus = useSelector((state: RootState) => state.employee.status);
  const getErrorMsg = useSelector((state: RootState) => state.employee.errorMsg);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [cookies, setCookie, removeCookie] = useCookies(['jwttoken']);

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const departments: string[] = useSelector((state: RootState) => state.department.department);

  const [employeeDetails, setEmployeeDetails] = useState({
    name: '',
    salary: 0,
    department: "HR",
  });
  const currentEmployee = useSelector(
    (state: RootState) => state.employee.currentEmployee
  );

  useEffect(() => {
    if (editMode) {
      // Fetch current employee data
      dispatch(fetchEmployeeById({id: getId, token: cookies.jwttoken}));
    } 
  }, []);

  useEffect(() => {
    if (editMode) {
      setEmployeeDetails(state => ({...state, name: currentEmployee.name, salary: currentEmployee.salary, department: currentEmployee.department}));
    }
  }, [currentEmployee]);

  useEffect(() => {
    if (getStatus === Status.FULFILLED) {
      history.push("/");
      toast("Success!")
    } else if (getStatus === Status.REJECTED) {
      toast(getStatus + ': ' + getErrorMsg);
    }
  }, [getStatus]);
  
  // https://stackoverflow.com/questions/62465008/how-to-make-an-editable-prefixed-value-in-a-react-input-box
  const updateHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setEmployeeDetails({
      ...employeeDetails,
      [event.target.name]: event.target.value,
    });
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = employeeDetails.name;
    const enteredSalary = Number(employeeDetails.salary);
    const enteredDepartment = employeeDetails.department;

    if (editMode) {
      dispatch(
        updateEmployee({
          id: getId,
          name: enteredName,
          salary: enteredSalary,
          department: enteredDepartment,
          token: cookies.jwttoken
        })
      );

    } else {
      dispatch(
        addEmployee({
          name: enteredName,
          salary: enteredSalary,
          department: enteredDepartment,
          token: cookies.jwttoken
        })
      );
    }
  };

  const displayPleaseLoginMsg = () => {
    return (
      <h2 className={classes["please-login"]}>Please login.</h2>
    );
  }

  // https://stackoverflow.com/questions/71201613/how-to-create-editable-form-inputs-with-existing-prefill-data-in-react

  return (
    <Fragment>
      {isLoggedIn ? 
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          {/* https://stackoverflow.com/questions/69157200/minlength-doesnt-work-in-typescript-react */}
          <input
            type="text"
            name="name"
            minLength={4}
            maxLength={30}
            required={true}
            placeholder="John Doe"
            onChange={updateHandler}
            value={employeeDetails.name}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            name="salary"
            min="0"
            required={true}
            placeholder="2500"
            onChange={updateHandler}
            value={employeeDetails.salary}
          />
        </div>

        {/* Department should be dropdown */}
        <div className={classes.control}>
          <label htmlFor="name">Department</label>
          <select
            name="department"
            id="department"
            // ref={departmentInputRef}
            required={true}
            value={employeeDetails.department}
            onChange={updateHandler}
          >
            {/* <option value="HR">HR</option>
            <option value="PS">PS</option> */}
            {departments.map((result) => 
              <option key={result} value={result}>{result}</option>
            )}
          </select>
        </div>

        <div className={classes.actions}>
          <button className="btn">
            {editMode ? "Update" : "Add"}
          </button>
          
        </div>
      </form> : displayPleaseLoginMsg()}
    </Fragment>
  );
};

export default EmployeeForm;
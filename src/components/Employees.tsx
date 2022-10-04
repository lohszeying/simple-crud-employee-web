import React, { useEffect } from "react";
import Card from "./Card";
import classes from "./Employees.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchAllEmployees } from "../store/employee-slice";
import { useAppDispatch } from "../store/hooks";

const Employees = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAllEmployees());
  });

  const employees = useSelector((state: RootState) => state.employee.employees);
  return (
    <React.Fragment>
      <div className={classes["employees-body"]}>
      {employees.map((employee) => (
          <Card
            key={employee.id}
            employee={{
              id: employee.id,
              name: employee.name,
              salary: employee.salary,
              department: employee.department
            }}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Employees;
